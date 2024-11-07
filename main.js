import * as fs from "fs";



const settings = readJsonFile("setting.json");
const dateLanguage = readJsonFile("languages.json");
const months = readJsonFile("months.json");


const weekDay = getTodaysWeekDay();
const weekDayTranslated = getTodaysWeekDayTranslated(settings.language, weekDay);

const todayMonth = getTodaysMonth();
const monthTranslated = getTodaysMonthTranslated(settings.language);

// universali funkcija skaityti json faila
function readJsonFile(file){
    const fileData = fs.readFileSync(file);
    const data = JSON.parse(fileData);
    return data;
}

// susitvarkom dienas
function getTodaysWeekDay(){
    const currentDate = new Date();
    const weekDay = currentDate.getDay();
    return weekDay === 0 ? 7 : weekDay;
}

function getTodaysWeekDayTranslated(language, weekDay){
    return dateLanguage[language][weekDay];
}

// susitvarkom su menesiais
function getTodaysMonth(){
    const currentDate = new Date();
    const month = currentDate.getMonth() +1;
    return month;
}

function getTodaysMonthTranslated(language, monthNumebr){
    return months[language][monthNumebr];
}


function writeToFile(){
    const currentDate = new Date();
    const year = currentDate.getFullYear();

    const currentMonth = getTodaysMonthTranslated(settings.language, getTodaysMonth());
    const weekDay = currentDate.getDate();
    const translatedWeekDay = getTodaysWeekDayTranslated(settings.language, weekDay);


    const dateString = `${year}-${currentMonth}-${weekDay}.txt`;

    const dataString = `Metai: ${year}\nMenuo: ${currentMonth}\nMenesio diena: ${weekDay}\nSavaites diena: ${translatedWeekDay}\n\n`;

    fs.appendFile(dateString, dataString, (error) => {
        if(error) throw new Error ("Iskrito klaida atnaujinant faila");
        console.log("Failas sekmingai atnaujintas");
    });

}

writeToFile();