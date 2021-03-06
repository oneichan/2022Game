phina.define('ResultScene', {
    superClass: 'DisplayScene',
    init: function (param) {
        this.superInit(param);
        this.backgroundColor = 'floralwhite';

        var self = this;

        var titleLabel = Label({
            text: 'ใใใใ๐ฏ',
            fontFamily: 'chihaya',
            fontSize: 110,
        });
        titleLabel.addChildTo(this)
            .setPosition(this.gridX.center(), this.gridY.span(2));

        var turnLabel = Label({
            text: g_TurnCount + 'ๆ็ฎใงใขใฆใ๏ผ',
            fontWeight: 'bold',
            fontSize: 70,
            fontFamily: 'chihaya'
        });
        turnLabel.addChildTo(self)
            .setPosition(self.gridX.center(), self.gridY.span(0));
        turnLabel.tweener.clear()
            .to({ y: self.gridY.span(5) }, 300, 'easeInOutBack');

        var scoreLabel = Label({
            text: g_Score + '็น',
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
            comentText = 'ใฉใใพใใงใใ'
        } else if (g_Score < 100) {
            comentText = 'ใใผใใ'
        } else if (g_Score < 200) {
            comentText = 'ใพใใพใใใใงใใใใ'
        } else if (g_Score < 300) {
            comentText = 'ใใใใใ'
        } else if (g_Score < 500) {
            comentText = 'ใใใ ใปใผ๏ผ'
        } else {
            comentText = 'ใฟใใใ๐'
        }

        if (g_TurnCount < 2) {

        }
        else if (g_TurnCount < 3) {
            comentText += '\nใใใกใใฃใจใญใฐใใใใจใใใ'
        } else if (g_TurnCount < 7) {
            comentText += '\nใตใคใใงใใ'
        } else if (g_TurnCount < 10) {
            comentText += '\nใชใใใตใใใจใ'
        } else if (g_TurnCount < 20) {
            comentText += '\n10ๆไปฅไธใฏใใใ๐'
        } else {
            comentText += '\nใใใใใใพใง็ใๅปถใณใ๏ผ'
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
            text: 'ใใใจใ',
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