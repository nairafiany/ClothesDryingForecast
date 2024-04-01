import { forecastType } from "../types"
type Props = {
    data: forecastType
}
const Degree = ({temp} : {temp: number}): JSX.Element=> (
    <span>
        {temp} <sup>0</sup>
    </span>

)
const shouldDryClothesOutside = (temp: number, humidity: number, windSpeed: number, pop: number): string => {
    const tempC = temp - 273.15; // Convert Kelvin to Celsius
    if (tempC < 18 || tempC > 29) return "Nope. You'd either freeze or bake your undies.";
    if (humidity > 99) return "Too sticky. Your clothes would feel like they've made a new friend.";
    if (windSpeed < 1) return "Air's too lazy today. It won't bother helping.";
    if (windSpeed > 15) return "Hold onto your hats, and maybe your shirts too. It's a bit too breezy.";
    if (pop > 0) return "Rain's crashing your laundry party. Maybe next time.";
    return "Bingo! The weather gods smile upon your laundry today. :)";
};


const Forecast = ({data} : Props): JSX.Element => {
const today = data.list[0]
const advice = shouldDryClothesOutside(today.main.temp, today.main.humidity, today.wind.speed, today.pop);

 return (
    <div className="w-full md:max-w-[500px] py-4 md:py-4 mdLpx-10 lg:px-24
    h-full lg:h-auto bg-white bg-opacity-20 backdrop-blur-ls rounded
    drop-shadow-lg">
        <div className="mx-auto w-[300px]">
        <section className="text-center"> 
            <h2 className='text-2x1 font-black'>{data.name}  
            <span className="font-thin"> {data.country}</span></h2>

            <h1 className="text-4x1 font-extrabold">
            <Degree temp={Math.round(today.main.temp - 273.15)}/>
        </h1>
        <p className="text-xs">
            {today.weather[0].main} {today.weather[0].description}
            {today.main.humidity}
            {today.wind.speed}
        </p>
        <div className="pt-10">
            <p className="italic">Should you or should you not?</p>
        <div className="mt-4 font-extrabold">
            {advice}
        </div>
        </div>
        </section>
        </div>
    </div>
 )
}

export default Forecast