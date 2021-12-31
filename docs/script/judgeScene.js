phina.define('JudgeScene',{
    superClass: 'DisplayScene',
    init:function(param){
        this.superInit();
        this.backgroundColor = 'floralwhite';

        var self = this;
        this.backgroundColor = 'floralwhite';

        var nextButtonText = "";

        // 画像表示
        var usiSprite = Sprite(param.assetKey)
        usiSprite.addChildTo(this)
            .setPosition(this.gridX.center(), this.gridY.span(USI_GRID_Y))
            .setScale(USI_SIZE_SCALE,USI_SIZE_SCALE);

        // ラベル
        var label = NotoLabel();
        label.addChildTo(this)
            .setPosition(this.gridX.center(), this.gridY.span(2));
        if(param.isCorrect){
            label.text = "正解！ \n これは" + param.correctWord + "です";
            g_CorrectQuizCount++;
            nextButtonText = "つぎへ";
        }else{
            label.text = "不正解… \n正解は " + param.correctWord + " です";
            nextButtonText = "タイトルへ";
            this.backgroundColor = 'lavender';
        }

        var nextButton = AnimateButton({
            text:nextButtonText,
            fill:'white',
            stroke:'black',
            fontColor:'black',

        });
        nextButton.addChildTo(this)
        .setPosition(this.gridX.center(),this.gridY.span(13));
        nextButton.onpush = function(){
            if(param.isCorrect == false){
                // 不正解なら最初から
                self.exit('title');
                return;
            }
            if (g_AllQuizCount == g_CurrentQuizCount) {
                // 全問正解
                self.exit('result');
                return;
            }
            self.exit();
            
        };
        
    }
});