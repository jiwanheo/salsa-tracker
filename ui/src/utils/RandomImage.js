export const getRandomImage = () => {
    const strings = [
        "https://qotoqot.com/sad-animations/img/100/silent_tears/silent_tears.png", 
        "https://qotoqot.com/sad-animations/img/100/sitting_alone/sitting_alone.png", 
        "https://qotoqot.com/sad-animations/img/100/shy/shy.png", 
        "https://qotoqot.com/sad-animations/img/100/sigh/sigh.png", 
        "https://qotoqot.com/sad-animations/img/100/holding_back_tears/holding_back_tears.png",
        "https://qotoqot.com/sad-animations/img/100/sobbing/sobbing.png",
        "https://qotoqot.com/sad-animations/img/100/crying_in_hands/crying_in_hands.png",
        "https://qotoqot.com/sad-animations/img/100/emotional_eating/emotional_eating.png",
        "https://qotoqot.com/sad-animations/img/100/angry/angry.png",
        "https://qotoqot.com/sad-animations/img/100/shame/shame.png",
        "https://qotoqot.com/sad-animations/img/100/insomnia/insomnia.png",
        "https://qotoqot.com/sad-animations/img/100/sleepy/sleepy.png",
        "https://qotoqot.com/sad-animations/img/100/low_battery/low_battery.png",
        "https://qotoqot.com/sad-animations/img/100/headache/headache.png",
        "https://qotoqot.com/sad-animations/img/100/blanket/blanket.png",
        "https://qotoqot.com/sad-animations/img/100/social_anxiety/social_anxiety.png",
        "https://qotoqot.com/sad-animations/img/100/nervous/nervous.png",
        "https://qotoqot.com/sad-animations/img/100/fear/fear.png",
        "https://qotoqot.com/sad-animations/img/100/dread/dread.png",
    ];

    return strings[Math.floor(Math.random() * strings.length)];
}