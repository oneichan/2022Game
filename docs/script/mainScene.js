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
        this.isLuckey = false;
        this.cardCount = param.cardCount;

        var cardCount = param.cardCount;
        var self = this;
        var numbers = Array.range(MIN_CARDCOUNT, MAX_CARDCOUNT + 1).shuffle()

        // スコア表示ラベル
        var scoreLabel = Label({
            text: '得点 ' + g_Score + '点',
            fontSize: 70,
            fontFamily: 'aoyagi'
        });
        scoreLabel.addChildTo(self)
            .setPosition(self.gridX.span(4), self.gridY.span(5));
        // scoreLabel.tweener.clear()
        //     .to({ y: self.gridY.span(5) }, 300, 'easeInOutBack');

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
            });

            // カードクリック時
            card.onpush = function () {
                self.selectedCard = card;
                self.isCardSelected = true;
                card.selectAnimation().call(function () { self.faceUpAllCard(); });
                self.calculateScore(card.number);

                if (card.number === TORA_NUMBER) {
                    scoreLabel.tweener.clear()
                        .wait(1200)
                        .call(function () {
                            SoundManager.stopMusic();
                            SoundManager.play('se_tora');
                        })
                }
                else {
                    // スコアラベル更新
                    scoreLabel.tweener.clear()
                        .wait(1000)
                        .by({ y: -100 }, 200)
                        .set({ text: '得点 ' + g_Score + '点', })
                        .call(function () {
                            if (cardCount === 2) {
                                SoundManager.play('se_scoreL');
                            } else {
                                SoundManager.play('se_scoreN');
                            }
                        })
                        .by({ y: 100 }, 200);
                }
            };
            cards.push(card);
        }
        cards.shuffle();
        this.cards = cards;

        // カード表示
        var cardGroup = DisplayElement({ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }).addChildTo(this);

        var xWidth = (CARD_SIZE_X * cardCount) + (CARD_OFFSET * (cardCount - 1))
        var cardGridX = Grid({
            width: xWidth,
            columns: cardCount - 1,
            offset: (SCREEN_WIDTH - xWidth) / 2,
        });
        var cardGridY = Grid({
            width: CARD_SIZE_Y,
            columns: CARD_COLUMN_Y,
            offset: SCREEN_HEIGHT * 0.75
        });
        for (let index = 0; index < cards.length; index++) {
            let card = cards[index];
            card.setPosition(
                cardGridX.span(index),
                cardGridY.span(2),
            );
            card.addChildTo(cardGroup);
            let waittime = index * 100;
            card.appear(waittime, cardGridY.span(0));
        }

        // ターン数カウント
        g_TurnCount++;

        // ターン数表示ラベル
        var turnLabel = Label({
            text: g_TurnCount + '手目',
            fontSize: 80,
            fontFamily: 'chihaya'
        });
        turnLabel.addChildTo(self)
            .setPosition(self.gridX.center(), self.gridY.span(0));
        turnLabel.tweener.clear()
            .to({ y: self.gridY.span(2) }, 300, 'easeInOutBack');

        var erabeLabel = Label({
            text: 'えらべ！',
            fontSize: 80,
            fontFamily: 'chihaya'
        });
        erabeLabel.addChildTo(self)
            .setPosition(self.gridX.center(), self.gridY.span(0));
        erabeLabel.tweener.clear()
            .to({ y: self.gridY.span(7.5) }, 300, 'easeInOutBack');

        // 出口を設置
        // if (g_TurnCount % EXITCHANCE_TURN === 0){
        //     var creditButton = AnimateButton({
        //         text:'ここでやめ',
        //         width:230,
        //         height:60,
        //         fontSize:40,
        //         strokeWidth:10,
        //     });
        //     creditButton.addChildTo(this)
        //     .setPosition(this.gridX.span(13),this.gridY.span(14.5));
        //     creditButton.onpush = function(){
        //         creditButton.tweener.clear()
        //             .wait(700)
        //             .call(function(){
        //                 self.exit('result');
        //             });
        //     ;};
        // }

        SoundManager.play('se_dodon');
    },
    update: function (app) {
        var self = this;
        if (this.isLuckey) {
            // 幸運ラベル表示
            var lblGrp = DisplayElement().addChildTo(self)
                .setPosition(self.gridX.span(-3), self.gridY.span(7));
            var backShape = CircleShape({
                fill: 'yellow',
                radius: 100,
                shadow: 'yellow',
                shadowBlur: 100,
                padding: 600,
                stroke: false,
            });
            backShape.addChildTo(lblGrp);

            var label = Label({
                text: '幸運',
                fontWeight: 'bold',
                fontSize: 90,
                fontFamily: 'aoyagi',
                fill: 'black',
                width: SCREEN_WIDTH * 3
            });
            label.addChildTo(lblGrp)

            lblGrp.alpha = 0;
            lblGrp.tweener.clear()
                .wait(1000)
                .to({ x: self.gridX.span(2) }, 200)
                .to({ alpha: 0.5, x: self.gridX.center() }, 200)
                .to({ alpha: 1.0 }, 400)
                .wait(300)
                .to({ alpha: 0, x: self.gridX.span(20) }, 200);
            this.isLuckey = false;
        }
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
    nextTurn: function (selectNumber) {
        // シーン遷移
        if (selectNumber === TORA_NUMBER) {
            this.exit('result', {

            });
        } else {
            this.exit('main', {
                cardCount: selectNumber,
            });
        }
    },

    // スコア計算
    calculateScore: function (selectNumber) {
        var self = this;

        // 計算処理
        if (selectNumber === TORA_NUMBER) {
            // g_Score = (g_Score / 2).floor();
            return;
        }

        var baseNum = SCORE_BASE - this.cardCount;
        if (this.cardCount === 2) {
            // ラッキー賞
            baseNum = SCORE_BASE_LUCKEY;
            this.isLuckey = true;
        }

        var getScore = DEFAULT_SCORE * baseNum;
        g_Score += getScore;

        // 加点ラベル表示
        var label = Label({
            text: '+' + getScore,
            fontWeight: 'bold',
            fontSize: 90,
            fontFamily: 'aoyagi',
            fill: 'black',
        });
        label.addChildTo(self)
            .setPosition(self.gridX.span(10), self.gridY.span(10));
        label.alpha = 0;
        label.tweener.clear()
            .wait(800)
            .to({ alpha: 1, y: self.gridY.span(5) }, 200)
            .wait(1500)
            .to({ alpha: 0 }, 200);
    },

    //全てのカードをめくる
    faceUpAllCard: function () {
        // 選択中カードを最初に捲る
        var self = this;
        self.cards.swap(0, self.cards.indexOf(self.selectedCard));

        self.cards.each(function (card, index) {
            let waittime = index * 100;
            if (card !== self.selectedCard) {
                waittime += 200;
            }
            card.faceUp(waittime);
        });
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
        this.fontSize = 150;
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
            .to({ width: CARD_SIZE_X * 1.2, height: CARD_SIZE_Y * 1.2 }, 100)
            .wait(200);
    },
    faceUp: function (waittime) {
        var self = this;
        self.setInteractive(false);
        self.tweener.clear()
            .wait(waittime)
            .to({ scaleY: 0.0 }, 100, "easeOutQuart")
            .call(
                function () {
                    self.showContent();
                }
            )
            .to({ scaleY: 1.0 }, 100, "easeInQuart");

    },
    showContent: function () {
        var self = this;
        // 表向きにする
        if (self.number === TORA_NUMBER) {
            //self.fontSize = 160;
            self.text = '🐯'
        } else {
            self.text = self.number;
        }
    },
    appear: function (waittime, toY) {
        var self = this;
        var toY = toY;
        self.setInteractive(false);
        self.tweener.clear()
            .wait(waittime)
            .to({ y: toY }, 100, 'easeInOutBack')
            .call(
                function () {
                    self.setInteractive(true);
                }
            );
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
