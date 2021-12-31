phina.define('MainScene', {
    superClass: 'DisplayScene',
    countTime: 0,
    waitTime: 700,

    init: function (param) {
        this.superInit(param);
        this.backgroundColor = 'floralwhite';
        this.time = 0;
        this.isCardSelected = false;
        this.isGoNextTurn = false;
        this.cardCount = param.cardCount;

        var cardCount = param.cardCount;
        var self = this;
        var numbers = Array.range(MIN_CARDCOUNT, MAX_CARDCOUNT + 1).shuffle()

        //カード作成
        var cards = new Array();
        for (let index = 0; index < cardCount; index++) {
            let num;
            if (index === 0) {
                // 寅カード
                num = TORA_NUMBER;
            } else {
                num = numbers[index - 1];
            }
            let card;
            card = Card({
                number: num,
                callback: self.faceUpOtherCard,
            });

            // カードクリック時
            card.onpush = function () {
                self.selectedCard = card;
                self.isCardSelected = true;
                card.selectAnimation().call(function () { self.faceUpAllCard(); });
            };
            cards.push(card);
        }
        cards.shuffle();
        this.cards = cards;

        // カード表示
        var cardGroup = DisplayElement({width:SCREEN_WIDTH,height:SCREEN_HEIGHT}).addChildTo(this);

        var xWidth = (CARD_SIZE_X * cardCount) + (CARD_OFFSET * (cardCount - 1))
        var cardGridX = Grid({
            width: xWidth,
            columns: cardCount - 1,
            offset: (SCREEN_WIDTH - xWidth) / 2,
        });
        var cardGridY = Grid({
            width: CARD_SIZE_Y,
            columns: CARD_COLUMN_Y,
            offset: CARD_SIZE_Y
        });
        for (let index = 0; index < cards.length; index++) {
            let card = cards[index];
            card.setPosition(
                cardGridX.span(index),
                cardGridY.span(0),
            );
            card.addChildTo(cardGroup);
        }

        // ターン数カウント
        g_TurnCount++;

        // ターン数表示ラベル
        var turnLabel = NotoLabel(g_TurnCount + 'ターン目');
        turnLabel.addChildTo(self)
            .setPosition(self.gridX.center(), this.gridY.span(13));

        // スコア表示ラベル
        var scoreLabel = NotoLabel(g_Score + '点');
        scoreLabel.addChildTo(self)
            .setPosition(self.gridX.center(), this.gridY.span(15));
    },
    update: function (app) {
        if (this.isCardSelected) {
            this.time += app.deltaTime;
            if (this.time > CARD_FACEUP_TIME) {
                // 次ターンへ行くまで少し間を空ける
                this.isGoNextTurn = true;
            }
        }
        if (this.isGoNextTurn) {
            this.nextTurn(this.selectedCard.number, this.cardCount)
        }
    },

    //次のターンへ行く処理
    nextTurn: function (selectNumber, currentCardCount) {

        // シーン遷移
        if (selectNumber === TORA_NUMBER) {
            this.exit('result', {

            });
        } else {
            // スコア計算（少数切り捨て）
            var getScore = (DEFAULT_SCORE / currentCardCount).floor();
            g_Score += getScore;
            this.exit('main', {
                cardCount: selectNumber,
            });
        }
    },

    //他のカードをめくる
    faceUpOtherCard: function () {
        var self = this;
        self.cards.each(function (card) {
            if (card === self.selectedCard) {

            } else {
                card.faceUp();
            }
        });
    },

    //全てのカードをめくる
    faceUpAllCard: function () {
        var self = this;
        self.cards.each(function (card,index) {
            var waittime = index * 100;
            card.faceUp(waittime);
        });
        //self.cards[0].faceUp();
    }
});

phina.define('Card', {
    superClass: 'AnimateButton',
    init: function (options) {
        options = (options || {}).$safe(Card.defaults);
        this.superInit(options);
        this.fill = 'white';
        this.stroke = 'black';
        this.fontColor = 'black';
        this.fontSize = 100;
        var num = options.number;
        this.number = num;
        this.cb = options.callback;
        this.text = '?';

        this.setSize(CARD_SIZE_X, CARD_SIZE_Y);
        if (g_isDebug) {
            this.text = num;
        }
    },

    selectAnimation: function () {
        var self = this;

        return self.tweener.clear()
            .to({ width:CARD_SIZE_X * 1.2, height:CARD_SIZE_Y * 1.2 }, 100)
            .wait(200);
    },

    faceUp: function (waittime) {
        var self = this;
        self.setInteractive(false);
        self.tweener.clear()
            .wait(waittime)
            .to({ scaleY: 0.0 }, 200, "easeOutQuart")
            .call(
                function () {
                    self.showContent();
                }
            )
            .to({ scaleY: 1.0 }, 300, "easeInQuart");

    },
    showContent: function () {
        var self = this;
        // 表向きにする
        if (self.number === TORA_NUMBER) {
            let toraSprite = Sprite('tora');
            toraSprite.width = CARD_SIZE_X;
            toraSprite.height = CARD_SIZE_Y;
            toraSprite.addChildTo(self);
        } else {
            self.text = self.number;
        }
    }
    // _static: {
    //     defaults: {
    //         scene: "",
    //         isCorrect: false,
    //         word: "none",
    //         correctWord: "none",
    //         assetKey: "none"
    //     },

    // },
});
