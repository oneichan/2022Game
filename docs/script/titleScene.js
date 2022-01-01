phina.define('TitleScene',{
    superClass: 'DisplayScene',
    init: function(params){
        this.superInit(params);
        this.backgroundColor = 'floralwhite';

        var self = this;

        // グローバル変数初期化
        g_TurnCount = 0;
        g_Score = 0;

        SoundManager.stopMusic();

        var titleLabel = Label({
            text:'2022',
            fontFamily:'chihaya',
            fontSize:180,
        });
        titleLabel.addChildTo(this)
        .setPosition(this.gridX.center(),this.gridY.span(3));
        
        var descriptionLabel = Label({
            fontFamily:'noto',
            fontSize: 70,
            text:'とらトラップ！\n〜🐯がでたらおわり〜'
        });
        descriptionLabel.addChildTo(this)
        .setPosition(this.gridX.center(),this.gridY.span(7.5));
        
        var startButton = AnimateButton({
            text:'はじめる',
        });
        startButton.addChildTo(this)
        .setPosition(this.gridX.center(),this.gridY.span(12));
        startButton.onpush = function(){
            startButton.tweener.clear()
                .wait(700)
                .call(function(){
                    SoundManager.playMusic('bgm_main');
                    self.exit({
                        cardCount:INIT_CARDCOUNT,
                    });
                });
        ;};

        var komeLabel = Label({
            fontFamily:'noto',
            fontSize: 50,
            fill: 'red',
            text: '※音が出ます！'
        });
        komeLabel.addChildTo(this)
        .setPosition(this.gridX.center(),this.gridY.span(15));
        
        // var howToButton = AnimateButton({
        //     text:'あそびかた',
        //     width:190,
        //     height:60,
        //     fontSize:40,
        //     strokeWidth:10,
        // });
        // howToButton.addChildTo(this)
        // .setPosition(this.gridX.span(14),this.gridY.span(13));
        // howToButton.onpush = function(){
        //     howToButton.tweener.clear()
        //         .wait(700)
        //         .call(function(){
        //             self.app.pushScene(CreditScene());
        //         });
        // ;};

        var creditButton = AnimateButton({
            text:'クレジット',
            width:190,
            height:60,
            fontSize:40,
            strokeWidth:10,
        });
        creditButton.addChildTo(this)
        .setPosition(this.gridX.span(14),this.gridY.span(15));
        creditButton.onpush = function(){
            creditButton.tweener.clear()
                .wait(700)
                .call(function(){
                    self.app.pushScene(CreditScene(params));
                });
        ;};


    }
});