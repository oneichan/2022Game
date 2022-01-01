phina.define('ResultScene', {
    superClass: 'DisplayScene',
    init: function (param) {
        this.superInit(param);
        this.backgroundColor = 'floralwhite';

        var self = this;

        var titleLabel = Label({
            text: 'あけおめ🐯',
            fontFamily: 'chihaya',
            fontSize: 110,
        });
        titleLabel.addChildTo(this)
            .setPosition(this.gridX.center(), this.gridY.span(2));

        var turnLabel = Label({
            text: g_TurnCount + '手目でアウト！',
            fontWeight: 'bold',
            fontSize: 70,
            fontFamily: 'chihaya'
        });
        turnLabel.addChildTo(self)
            .setPosition(self.gridX.center(), self.gridY.span(0));
        turnLabel.tweener.clear()
            .to({ y: self.gridY.span(5) }, 300, 'easeInOutBack');

        var scoreLabel = Label({
            text: g_Score + '点',
            fontWeight: 'bold',
            fontFamily: 'aoyagi',
            fontSize: 90,
        });
        scoreLabel.addChildTo(this)
            .setPosition(this.gridX.center(), this.gridY.span(0));
        scoreLabel.tweener.clear()
            .to({ y: self.gridY.span(7) }, 300, 'easeInOutBack');

        var comentText = '';
        if (g_Score === 0) {
            comentText = 'どんまいです。'
        } else if (g_Score < 100) {
            comentText = 'うーん。'
        } else if (g_Score < 200) {
            comentText = 'まあまあよいでしょう。'
        } else if (g_Score < 300) {
            comentText = 'よきよき。'
        } else if (g_Score < 500) {
            comentText = 'わんだほー！'
        } else {
            comentText = 'みらくる🌟'
        }

        if (g_TurnCount < 2) {

        }
        else if (g_TurnCount < 3) {
            comentText += '\nもうちょっとねばりたいところ。'
        } else if (g_TurnCount < 7) {
            comentText += '\nふつうです。'
        } else if (g_TurnCount < 10) {
            comentText += '\nないすふぁいと。'
        } else if (g_TurnCount < 20) {
            comentText += '\n10手以上はすごい🎉'
        } else {
            comentText += '\nよくぞここまで生き延びた！'
        }

        var comentLabel = Label({
            text: comentText,
            fontFamily: 'aoyagi',
            fontSize: 40,
        });
        comentLabel.addChildTo(this)
            .setPosition(this.gridX.center(), this.gridY.span(0));
        comentLabel.tweener.clear()
            .wait(200)
            .to({ y: self.gridY.span(10) }, 300, 'easeInOutBack');

        var startButton = AnimateButton({
            text: 'たいとる',
        });
        startButton.addChildTo(this)
            .setPosition(this.gridX.center(), this.gridY.span(14));
        startButton.onpush = function () {
            SoundManager.stopMusic();
            self.exit();
        };

        SoundManager.playMusic('se_result', 0, false);
    },
});