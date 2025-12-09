class TitleScene extends Phaser.Scene {
  constructor() {
    super({ key: 'TitleScene' });
  }

  create() {
    this.cameras.main.setBackgroundColor('rgba(255, 255, 255, 1)');

    this.add.text(60, 200, 'くいずげーむ', {
      fontSize: '32px',
      fontFamily: '"Noto Sans JP"',
      fill: '#ffffffff'
    });

   const startText = this.add.text(100, 300, ' ーーーーーーーー\n|おびブラクイズ  |\n|スタート！           |\nーーーーーーーー ', {
      fontSize: '24px',
      fontFamily: '"Noto Sans JP"',
      fill: '#000000ff',
      backgroundColor: '#ffffffff',
      padding: { x: 20, y: 10 }
    }).setInteractive();

    startText.on('pointerdown', () => {
      this.scene.start('QuizScene');
    });
  }
}

class QuizScene extends Phaser.Scene {
  constructor() {
    super({ key: 'QuizScene' });
  }

  preload() {
    this.questions = [
            {
         question: "この 画像はなに？",
        imageKey: "kimono",
        imagePath: "assets/ani/kimono/7.png",
        answers: ["白衣", "ドレス", "着物", "浴衣"],
        correct: 2,
        explanationText: "これは 中西呉服店の浴衣です\n綿100％で使い心地抜群" ,
        animationFrames : ["ani_7", "ani_8", "ani_9", "ani_10", "ani_11", "ani_12","ani_13",],
        animationFramePaths : [
          "assets/ani/kimono/7.png",
           "assets/ani/kimono/6.png",
            "assets/ani/kimono/5.png",
             "assets/ani/kimono/4.png",
              "assets/ani/kimono/3.png",
               "assets/ani/kimono/2.png",
                "assets/ani/kimono/1.png",
          
        ]
      }

    ];

    this.questions.forEach(q => {
      this.load.image(q.imageKey, q.imagePath);
      q.animationFrames.forEach((frameKey, i) => {
        this.load.image(frameKey, q.animationFramePaths[i]);
      });
    });
      this.load.image("kaisetu", "assets/kaisetu/nakanisi.png");
  }

  create() {
  ;
    this.currentQuestionIndex = 0;
    this.choices = [];
      this.score = 0; 
    this.animationSprite = null;
    this.animationTimer = null;
    console.log(this.textures.list);
    //this.add.image(180, 400, 'ani_0').setDisplaySize(100, 100); 画像が読み込めているかの確認。読み込めている。
    this.resultText = this.add.text(20, 560, '', {
      fontSize: '28px',
      fontFamily: '"Noto Sans JP"',
      fill: '#ffffffff',
     
  
    });

    this.showQuestion(this.currentQuestionIndex);
  }

  showQuestion(index) {
    const q = this.questions[index];

    if (this.questionText) this.questionText.destroy();
    if (this.imageObject) this.imageObject.destroy();
    if (this.explanationText) this.explanationText.destroy();
    if (this.nextButton) this.nextButton.destroy();
    if (this.animationSprite) this.animationSprite.destroy();
    if (this.animationTimer) {
      this.animationTimer.remove();
      this.animationTimer = null;
    }

    this.choices.forEach(btn => btn.destroy());
    this.choices = [];
    this.resultText.setText('');

    this.questionText = this.add.text(20, 20, q.question, {
      fontSize: '24px',
      fontFamily: '"Noto Sans JP"',
      fill: '#000',
      wordWrap: { width: 320 }
    });

    this.imageObject = this.add.image(220, 180, q.imageKey);
    this.imageObject.setDisplaySize(200, 200);

    for (let i = 0; i < q.answers.length; i++) {
      const btn = this.add.text(20, 360 + i * 50, q.answers[i], {
        fontSize: '20px',
        backgroundColor: '#eee',
        padding: { x: 10, y: 5 },
        fill: '#000',
        fontFamily: '"Noto Sans JP"'
      }).setInteractive();

      btn.on('pointerdown', () => {
        this.checkAnswer(i);
      });

      this.choices.push(btn);
    }
  }

  checkAnswer(selectedIndex) {
    const q = this.questions[this.currentQuestionIndex];

    this.choices.forEach(btn => btn.disableInteractive());


    if (selectedIndex === q.correct) {
      this.resultText.setText("せいかい！");
      this.resultText.setFill("#FFDC00");
       this.score++;
    } else {
      this.resultText.setText("ざんねん！");
      this.resultText.setFill("#ff0000");
    }

    this.time.delayedCall(1500, () => {
  this.showExplanation(q);
});
  }

  showExplanation(q) {
    if (this.questionText) this.questionText.destroy();
    if (this.imageObject) this.imageObject.destroy();
    this.choices.forEach(btn => btn.destroy());
    this.choices = [];
     // 手動アニメーション
    let frameIndex = 0;
    this.animationSprite = this.add.image(220, 150, q.animationFrames[frameIndex]);
    this.animationSprite.setDisplaySize(200, 200);

    this.animationTimer = this.time.addEvent({
      delay: 1750,
      callback: () => {
        frameIndex = (frameIndex + 1) % q.animationFrames.length;
        this.animationSprite.setTexture(q.animationFrames[frameIndex]);
      },
      loop: true
    });
  this.explainImage = this.add.image(220, 450, "kaisetu");
  this.explainImage.setDisplaySize(220, 220);
   // if (this.animationTimer) {
     // this.animationTimer.remove();
     // this.animationTimer = null;
   // }

   // if (this.animationSprite) {
  //    this.animationSprite.destroy();
//    this.animationSprite = null;
//    }

    this.explanationText = this.add.text(20, 250, q.explanationText, {
      fontSize: '18px',
      fontFamily: '"Noto Sans JP"',
      fill: '#000000ff',
      wordWrap: { width: 320 }
    });

    this.nextButton = this.add.text(120, 600, '[ つぎへ ]', {
      fontSize: '20px',
      fontFamily: '"Noto Sans JP"',
      fill: '#fff',
      backgroundColor: '#0077cc',
      padding: { x: 20, y: 10 }
    }).setInteractive();

    this.nextButton.on('pointerdown', () => {
      this.nextButton.destroy();
      this.explanationText.destroy();
       this.resultText.destroy();
      if (this.animationSprite) {
        this.animationSprite.destroy();
        this.animationSprite = null;
      }
if (this.explainImage) {
      this.explainImage.destroy();
      this.explainImage = null;
    }
      this.currentQuestionIndex++;
      if (this.currentQuestionIndex < this.questions.length) {
        this.showQuestion(this.currentQuestionIndex);
      } else {
        this.showEndScreen();
      }
    });
  }

showEndScreen() {
    if (this.questionText) this.questionText.destroy();
    if (this.imageObject) this.imageObject.destroy();
    this.choices.forEach(btn => btn.destroy());
    if (this.animationTimer) {
      this.animationTimer.remove();
      this.animationTimer = null;
    }
    if (this.animationSprite) {
      this.animationSprite.destroy();
      this.animationSprite = null;
    }

this.add.text(40, 200, `遊んでくれてありがとう！\n他にもクイズのあるパネルが\nたくさんあるよ\nめぐってみてね！`, {
      fontSize: '24px',
      fontFamily: '"Noto Sans JP"',
      fill: '#2f9398ff'
    });

    const backBtn = this.add.text(100, 400, '[ たいとるにもどる ]', {
      fontSize: '22px',
      fontFamily: '"Noto Sans JP"',
      fill: '#000000ff',
      backgroundColor: '#ccc',
      padding: { x: 10, y: 15 }
    }).setInteractive();

    backBtn.on('pointerdown', () => {
      this.scene.start('TitleScene');
    });
  }
}

const config = {
  type: Phaser.AUTO,
      width: window.innerWidth,
    height: window.innerHeight,
  scale: {
        mode: Phaser.Scale.FIT,       // 端末に合わせて拡大縮小
        autoCenter: Phaser.Scale.CENTER_BOTH, // 中央寄せ
         width: 400,
    height: 850,
    },
  backgroundColor: '#fff',
  parent: 'game-container',
  scene: [TitleScene, QuizScene]
};

new Phaser.Game(config);
