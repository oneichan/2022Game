phina.define('CreditScene', {
    superClass: 'DisplayScene',
    init: function (params) {
        this.superInit(params);
        // 背景を半透明化
        this.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        var self = this;

        var titleLabel = Label({
            text: 'クレジット',
            fontFamily: 'chihaya',
            fill:'white',
            fontSize: 100,
        });
        titleLabel.addChildTo(this)
            .setPosition(this.gridX.center(), this.gridY.span(2));

        var descriptionLabel = Label({
            fontFamily: 'noto',
            fill:'white',
            fontSize: 50,
            text: '〜音楽〜\n魔王魂\n効果音ラボ\n\n〜ゲームライブラリ〜\nPhina.js'
        });
        descriptionLabel.addChildTo(this)
            .setPosition(this.gridX.center(), this.gridY.span(8));

        var backButton = AnimateButton({
            text: 'もどる',
            width:190,
            height:60,
            fontSize:40,
            strokeWidth:10,
        });
        backButton.addChildTo(this)
            .setPosition(this.gridX.center(), this.gridY.span(14));
        backButton.onpush = function () {
            backButton.tweener.clear()
                .wait(700)
                .call(function () {
                    self.exit({
                        
                    })
                });
            ;
        };

    }
});