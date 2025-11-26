 preload() 
    this.questions = [
      {
        question: "この 画像はなに？",
        imageKey: "tenu",
        imagePath: "assets/ani/tenu/7.png",
        answers: ["お菓子の箱", "手ぬぐい", "本", "はがき"],
        correct: 1,
        explanationText: "これは ほにや本店の手ぬぐいです\n着物以外にも草履なども販売しています",
        animationFrames: ["ani_0", "ani_1", "ani_2", "ani_3", "ani_4", "ani_5","ani_6",],
        animationFramePaths: [
          "assets/ani/tenu/7.png",
           "assets/ani/tenu/6.png",
            "assets/ani/tenu/5.png",
             "assets/ani/tenu/4.png",
              "assets/ani/tenu/3.png",
               "assets/ani/tenu/2.png",
                "assets/ani/tenu/1.png",
          
        ]
      },
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
      },
            {
        question: "この 画像はなに？",
        imageKey: "enogu",
        imagePath: "assets/ani/hude/7.png",
        answers: ["栄養ドリンク", "文房具", "絵具の筆", "化粧品"],
        correct: 2,
        explanationText: "これは松浦屋さんで売られている筆です\n油絵の黎明期から存在する歴史が長いお店です",
        animationFrames: ["ani_14", "ani_15", "ani_16", "ani_17", "ani_18", "ani_19","ani_20",],
        animationFramePaths: [
      "assets/ani/hude/7.png",
           "assets/ani/hude/6.png",
            "assets/ani/hude/5.png",
             "assets/ani/hude/4.png",
              "assets/ani/hude/3.png",
               "assets/ani/hude/2.png",
                "assets/ani/hude/1.png",
        ]
      },
            {
        question: "このTシャツには\n何がデザインされていた？",
        imageKey: "kao",
        imagePath: "assets/ani/kao/7.png",
        answers: ["動物","アニメのキャラクター","なおみさん","帯屋町のロゴ"],
        correct: 2,
        explanationText: "これはおもしろ洋服店ICHIYAさんの\nオリジナルイラストTシャツです\nあなたのお顔がTシャツに！",
        animationFrames: ["ani_21", "ani_22", "ani_23", "ani_24", "ani_25", "ani_26","ani_27",],
        animationFramePaths: [
          "assets/ani/kao/7.png",
          "assets/ani/kao/6.png",
          "assets/ani/kao/5.png",
          "assets/ani/kao/4.png",
          "assets/ani/kao/3.png",
          "assets/ani/kao/2.png",
           "assets/ani/kao/1.jpg",
        ]
      }

    ];

    this.questions.forEach(q => {
      this.load.image(q.imageKey, q.imagePath);
      q.animationFrames.forEach((frameKey, i) => {
        this.load.image(frameKey, q.animationFramePaths[i]);
      });
    });
      this.load.image("kaisetu", "assets/kaisetu.png");
  