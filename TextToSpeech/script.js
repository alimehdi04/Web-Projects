// SpeechSynthesis
// cancel : ƒ cancel()
// getVoices :  ƒ getVoices()
// onvoiceschanged : (...)
// pause : ƒ pause()
// paused : (...)
// pending : (...)
// resume : ƒ resume()
// speak : ƒ speak()
// speaking: (...)

var voices = [];
const voiceSelect = document.getElementById("voiceSelect");
function populatedvoicelist(){
    voices = window.speechSynthesis.getVoices();
    console.log(voices);
    voiceSelect.innerHTML = "";
    voices.forEach((voice, index)=>{
        var option = document.createElement("option");
        option.className = "option"
        option.textContent = `${voice.name} (${voice.lang})`;
        option.value = index;
        voiceSelect.appendChild(option);
    })
}
if(typeof speechSynthesis !== undefined && speechSynthesis.onvoiceschanged !== undefined)
{
    speechSynthesis.onvoiceschanged = populatedvoicelist;
}
let voiceopt = document.getElementById("voiceSelect");
voiceopt.addEventListener('click', populatedvoicelist());


let resetbtn = document.getElementById("reset");
resetbtn.addEventListener('click', ()=>{
    const text = document.getElementById("text")
    let textValue = text.value;
    text.value = "";
    text.appendChild();
})

let speakbtn = document.getElementById("speak");
speakbtn.addEventListener('click', ()=>{
    const text = document.getElementById("text")
    let textValue = text.value;
    // console.log(textValue);
    
    if(textValue == "")
    {
        const utterance = new SpeechSynthesisUtterance("Enter some text in text box please");
        window.speechSynthesis.speak(utterance);
    }

    const utterance = new SpeechSynthesisUtterance(textValue);
    const selectVoiceIndex = voiceSelect.value;
    utterance.voice = voices[selectVoiceIndex];
    utterance.rate = parseFloat(document.getElementById("rate").value);
    utterance.pitch = parseFloat(document.getElementById("pitch").value);
    utterance.volume = parseFloat(document.getElementById("volume").value);
    
    //Speaking Speech
    window.speechSynthesis.speak(utterance);

    //creating audioblob for download
    utterance.addEventListener('end', ()=>{
        window.speechSynthesis.cancel();
        utterance.onend = null;
        utterance.onerror = null;

        utterance.onend = ()=>{
            utterance.onend = null;
            utterance.onerror = null;
            utterance.dispatchEvent(new Event('end'));
            const audio = new Blob([utterance], {type:'audio/wav'});
            downloadAudio(audio);
        };
    });
});

let downloadlink = document.getElementById("download");
function downloadAudio(audio)
{
    const url = URL.createObjectURL(audio);
    downloadlink.href = url;
    downloadlink.click();
}
