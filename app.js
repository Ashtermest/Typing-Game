const paragraphs = ["Video games have evolved dramatically since their inception in the mid-20th century, transforming from simple pixelated forms of entertainment into complex, immersive experiences that span numerous genres and platforms. This evolution has been accompanied by growing academic and public interest in the impact of video games on individuals and society. As interactive digital media, video games uniquely blend elements of art, storytelling, technology, and user engagement, influencing cognitive, social, and cultural dimensions.One of the most significant impacts of video games is on cognitive development and functioning. Research indicates that playing video games can enhance various cognitive abilities, including spatial reasoning, problem-solving skills, and hand-eye coordination. Games often require players to navigate complex environments, manage resources, and devise strategies, which can translate into improved cognitive flexibility and multitasking skills in real-life scenarios. For instance, action games have been shown to increase reaction times and attentional capacities, while puzzle games can enhance logical thinking and pattern recognition.",

"Socially, video games serve as a platform for interaction and community building. Online multiplayer games, such as 'World of Warcraft' and 'Fortnite,' enable players from around the world to collaborate and compete, fostering teamwork and communication skills. These virtual environments can provide a sense of belonging and identity, especially for individuals who may struggle with social interactions in traditional settings. Furthermore, video games often feature narratives and characters that encourage empathy and moral reflection, allowing players to explore diverse perspectives and ethical dilemmas.Culturally, video games have become a significant form of artistic expression and storytelling. Modern video games incorporate sophisticated graphics, music, and narratives that rival those of movies and literature. Games like 'The Last of Us' and 'Red Dead Redemption' offer rich, emotionally engaging stories that tackle complex themes such as survival, loss, and redemption. This artistic dimension has led to the recognition of video games as a legitimate medium for cultural and creative expression, contributing to the broader discourse on art and media.",

"Despite these positive aspects, video games also face criticism and concerns, particularly regarding their potential negative effects. One of the most debated issues is the association between violent video games and aggressive behavior. While some studies suggest a correlation, the evidence remains inconclusive, with many experts arguing that factors such as individual personality and social environment play more significant roles in determining behavior. Additionally, excessive gaming can lead to negative outcomes such as addiction, social isolation, and physical health problems like obesity and repetitive strain injuries.In conclusion, video games are a complex and multifaceted medium that significantly impacts cognitive, social, and cultural domains. They offer numerous benefits, including cognitive enhancements, social connectivity, and artistic expression, while also presenting challenges that need to be addressed, such as potential aggression and addiction. As video games continue to evolve and integrate more deeply into society, ongoing research and balanced perspectives are essential to understanding their full impact and maximizing their positive contributions.",

"Gaming has become a significant economic driver. The global gaming market was valued at over $150 billion in 2020 and continues to grow rapidly. This growth is fueled by various revenue streams, including game sales, in-game purchases, and esports. Major gaming companies like Nintendo, Sony, and Microsoft have become household names, contributing significantly to national economies.Esports, competitive gaming at a professional level, has also become a lucrative industry. Tournaments such as The International for 'Dota 2' and the League of Legends World Championship offer multi-million-dollar prize pools, attracting millions of viewers worldwide. The rise of streaming platforms like Twitch and YouTube Gaming has further popularized esports, creating new opportunities for gamers to monetize their skills.Moreover, gaming fosters social interaction and community building. Online multiplayer games and social platforms enable players to connect, collaborate, and compete with others globally. This connectivity has led to the formation of diverse gaming communities that transcend geographical boundaries. Gaming also promotes cognitive and motor skills development. Studies have shown that playing video games can enhance hand-eye coordination, problem-solving abilities, and strategic thinking. Educational games are increasingly used as teaching tools, making learning interactive and engaging. Despite its many benefits, gaming also presents several challenges. One of the primary concerns is addiction. The World Health Organization (WHO) recognized gaming disorder as a mental health condition in 2018, highlighting the potential for excessive gaming to interfere with daily life and responsibilities.",




"Sports have long been a cornerstone of human society, transcending cultural, social, and geographical boundaries. From ancient Olympic games in Greece to modern-day global events like the FIFA World Cup and the Olympics, sports have not only provided entertainment but have also played a crucial role in shaping cultures, fostering unity, and promoting health. This essay delves into the multifaceted significance of sports, exploring their impact on physical health, mental well-being, social cohesion, and economic development. One of the most evident benefits of sports is their contribution to physical health. Regular participation in sports activities promotes cardiovascular fitness, muscle strength, and overall physical endurance. Engaging in sports from a young age helps in the development of motor skills and coordination. Moreover, sports serve as a preventive measure against various lifestyle-related ailments such as obesity, hypertension, and diabetes. The World Health Organization (WHO) recommends at least 150 minutes of moderate-intensity physical activity per week, which can be easily achieved through sports, thus highlighting their importance in maintaining a healthy lifestyle.",
];

const typingText = document.querySelector(".typing-text p");
const inpField = document.querySelector(".wrapper .input-field");
const tryAgainbtn = document.querySelector(".content button");
const timeTag = document.querySelector(".time span b");
const mistakeTag = document.querySelector(".mistake span");
const wpmTag = document.querySelector(".wpm span");
const cpmTag = document.querySelector(".cpm span");


let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = mistakes = isTyping = 0;

function loadParagraphs(){
    const randIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[randIndex].split("").forEach(char =>{
        let span = `<span>${char}</span>`
        typingText.innerHTML += span;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping(){
    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];

    if(charIndex < characters.length - 1 && timeLeft > 0){
        if(!isTyping){
            timer = setInterval(initTimer,1000);
            isTyping = true;
        }
        if(typedChar == null){
            if(charIndex > 0){
                charIndex--;
                if(characters[charIndex].classList.contains("incorrect")){
                    mistakes--;
            }
            
            characters[charIndex].classList.remove("correct", "incorrect");
            }
        }else{
            if(characters[charIndex].innerText == typedChar){
                characters[charIndex].classList.add("correct");
            }else{
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        let wpm = Math.round(((charIndex - mistakes)/ 5) / (maxTime -timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm ===Infinity ? 0:wpm;

        wpmTag.innerHTML = wpm;
        mistakeTag.innerText = mistakes;
        cpmTag.innerText = charIndex - mistakes;
        }else{
            clearInterval(timer);
            inpField.value = "";
        }
}

function initTimer(){
    if(timeLeft > 0){
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round(((charIndex - mistakes) / 5)/ (maxTime-timeLeft)* 60);
        wpmTag.innerText = wpm;
    }else{
        clearInterval(timer);
    }
}

function resetGame(){
    loadParagraphs();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inpField.value = "";
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    mistakeTag.innerText = 0;
    cpmTag.innerText = 0;
}

loadParagraphs();
inpField.addEventListener("input",initTyping);
tryAgainbtn.addEventListener("click", resetGame);

