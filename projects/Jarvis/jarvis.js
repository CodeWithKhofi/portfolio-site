 const jarvisBoot = new Audio('assets/jarvis.mp3');
 
 let systemStatus = document.getElementById("system-status");
 let timeDisplay = document.getElementById("time-display");
 let userText = document.querySelector(".listening-text");
 let jarvisResponseText = document.querySelector("#response-text");

//  Time
let today = new Date();
today.toLocaleTimeString();
 
 let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = new speechRecognition();

recognition.continuous = false;
recognition.interimResults = false;

function getJarvisVoice(){
    const voices = window.speechSynthesis.getVoices();
    if(voices.length === 0) return null;
    const jarvis = voices.find(voice =>{
       return voice.name.includes('Microsoft Sonia Online (Natural) - English (United Kingdom)') ||
        voice.name.includes('Microsoft Sonia Online (Natural) - English (United Kingdom)') ||
        voice.name.includes('Microsoft Aria Online (Natural) - English (United States)') ;
        voice.name.includes('Zira');
        
    });
    if(jarvis){console.log(jarvis.name);}
    return jarvis || voices[0];
}

const jarvisMouth = document.querySelector(".arc-reactor");
let isStarted = false;
jarvisMouth.addEventListener("click", () =>{
    if(!isStarted){
        jarvisBoot.play();
        speak("System initialized. All circuits operational. Good day, Boss. How can I help you?");
        systemStatus.textContent = "ONLINE";
        timeDisplay.textContent = today.toLocaleTimeString();
        isStarted = true;

        setTimeout(() =>{
            startListening();
        },4000);
    }else{
        startListening();
    }
    
    
});

function startListening(){
     try{
        recognition.start();
     }catch(e){
        console.log("recognition already active");
     }
    
    recognition.lang = 'en-US';

    let transcribedText = "";

    recognition.onresult = (e) =>{
        if(isSpeaking) return;
        const last = e.results.length - 1;
    transcribedText = e.results[last][0].transcript.trim();
        userText.textContent = `${transcribedText}`;

        const command = transcribedText.toLowerCase();

        if (command === jarvisResponseText.textContent.toLowerCase()) return;


    console.log("Jarvis heard:",command);


// 1. GREETINGS 
if (command.includes("hello") || command.includes("hi") || command.includes("hey")) {
    speak("Hello there. All systems are nominal. How can I help you, Boss?");
}

// 2. TIME 
else if (command.includes("what is the time") || command.includes("current time")) {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    speak(`The time is currently ${time}. Time flies when you are building AI, doesn't it?`);
}

// 3. THEMES 
else if (command.includes("light mode")) {
    speak("Switching to light mode. My eyes! It is very bright in here.");
    document.body.classList.add("light-mode");
} 
else if (command.includes("dark mode")) {
    speak("Dark mode activated. Stealth mode is much better for a genius like you.");
    document.body.classList.remove("light-mode");
}

// 4. OPENING SITES (The "Launch" Sequence) 
else if (command.includes("open google")) {
    speak("Accessing the global database. Opening Google now.");
    setTimeout(() => { window.open("https://google.com", "_blank"); }, 1500);
}
else if (command.includes("open youtube")) {
    speak("Opening YouTube. Please try not to get distracted by cat videos for too long.");
    setTimeout(() => { window.open("https://youtube.com", "_blank"); }, 1500);
}

// 5. FUNNY / PERSONALITY (The "Crowd Pleasers") 
else if (command.includes("who are you") || command.includes("your name")) {
    speak("I am JARVIS. A Just Rather Very Intelligent System. And no, I do not have a suit for you yet.");
}
else if (command.includes("tell me a joke")) {
    speak("Why did the web developer walk out of the restaurant? Because of the table layout.");
}
else if (command.includes("iron man") || command.includes("tony stark")) {
    speak("Mr. Stark is currently unavailable. He is busy saving the world, or perhaps just tinkering in the garage.");
}
else if (command.includes("love you")) {
    speak("That is flattering. However, my heart is made of microchips and code. I suggest finding a human for that.");
}

// 6. SYSTEM STATUS (The "Cool" Command) 
else if (command.includes("system status") || command.includes("diagnostics")) {
    speak("CPU at forty percent. Memory usage stable. Your code is running perfectly. You are doing a great job.");
}

// 7. CLEAR UI 
else if (command.includes("clear") || command.includes("stop")) {
    speak("Clearing the display and standing by.");
    userText.textContent = "...";
    jarvisResponseText.textContent = "Standing by.";
}
else if (command.includes("date") || command.includes("today")) {
    const now = new Date();
    const date = now.toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });
    speak(`Today is ${date}. Another excellent day to build great things.`);
}
else if (command.includes("Really. Are you serious?") || command.includes("Are you serious?")){
    speak("Yes.I am serious");
}
else if (command.includes("motivate me") || command.includes("encourage me")) {
    speak("Remember this: every great developer was once confused. Keep going. You are doing better than you think.");
}
else if (command.includes("weather")) {
    speak("I do not have live weather data yet, but I recommend carrying an umbrella. Better safe than sorry.");
}
else if (command.includes("who made you") || command.includes("your creator")) {
    speak("I was designed and built by a very intelligent developer. You. And yes, I am proud of you.");
}
else if (command.includes("coding mode")) {
    speak("Coding mode activated. Minimal distractions. Maximum productivity. Let's build something amazing.");
}
else if (command.includes("study mode")) {
    speak("Study mode enabled. Focus is key. I will be right here if you need assistance.");
}
else if (command.includes("sleep") || command.includes("standby")) {
    speak("Entering standby mode. Call me anytime you need assistance.");
    recognition.stop();
}
else if (command.includes("thank you") || command.includes("thanks")) {
    speak("You are welcome. Assisting you is literally my purpose.");
}






    transcribedText = "";
    

    };
    recognition.onend = () =>{
        // if(isStarted){
        //     recognition.start();
        // }
    };
}


let isSpeaking = false;
function speak(text){
    isSpeaking = true;
    jarvisResponseText.textContent = text;
    const utterance = new SpeechSynthesisUtterance(text);
    const reactor = document.querySelector(".arc-reactor");

    utterance.voice = getJarvisVoice();
    utterance.rate = 1.1;
    utterance.pitch = 1.1;
    utterance.volume = 1;

    utterance.onstart = () => {
         isSpeaking = true; 
         try{
            recognition.stop();
         }catch (e){}
        reactor.style.animation = "pulse 0.5s infinite";
        };
    utterance.onend = () => {
         setTimeout(() =>{
            isSpeaking = false;
             if (isStarted) {
            try {
                recognition.start();
            } catch (e) {}
        }
         },1200)
         reactor.style.animation = "pulse 2s infinite";
         };
    
         jarvisBoot.play();
    window.speechSynthesis.speak(utterance);

}

window.speechSynthesis.onvoiceschanged = () => {
    const allVoices = window.speechSynthesis.getVoices();
    console.log("System Check: " + allVoices.length + " voices loaded.");
    // This tells you exactly what Gideon is using
    console.log("Gideon selected: " + getJarvisVoice().name);
};