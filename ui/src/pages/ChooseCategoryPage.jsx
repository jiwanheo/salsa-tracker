import Card from "../components/Cards/Card";
import CardsContainer from "../components/Cards/CardsContainer";
import ProgressBar from "../components/ProgressBar/ProgressBar";
import BackButton from "../components/BackButton/BackButton";
import { useLocation, useNavigate } from 'react-router-dom';

export default function ChooseCategoryPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const categoryType = queryParams.get('type');

    // Need a function to break up the text
    const handsData = [
        {
            image: "https://qotoqot.com/sad-animations/img/100/sitting_alone/sitting_alone.png",
            textSection: <p>Lead's left &lt;-&gt; follow's right</p>,
        },
        {
            image: "https://qotoqot.com/sad-animations/img/100/sigh/sigh.png", 
            textSection: <p>Lead's left &lt;-&gt; follow's left</p>,
        },
        {
            image: "https://qotoqot.com/sad-animations/img/100/holding_back_tears/holding_back_tears.png", 
            textSection: <p>Lead's right &lt;-&gt; follow's left</p>,
        },
        {
            image: "https://qotoqot.com/sad-animations/img/100/sobbing/sobbing.png", 
            textSection: <p>Lead's right &lt;-&gt; follow's right</p>,
        },
        {
            image: "https://qotoqot.com/sad-animations/img/100/crying_in_hands/crying_in_hands.png", 
            textSection: <p>Both hands straight</p>,
        },
        {
            image: "https://qotoqot.com/sad-animations/img/100/emotional_eating/emotional_eating.png", 
            textSection: <p>Crossed hands (lead's right on top)</p>,
        },
        {
            image: "https://qotoqot.com/sad-animations/img/100/angry/angry.png", 
            textSection: <p>Crossed hands (lead's left on top)</p>,
        },
        
    ];

    const positionsData = [
        {
            image: "https://qotoqot.com/sad-animations/img/100/shame/shame.png",
            textSection: <p>Cross Body Lead</p>,
        },
        {
            image: "https://qotoqot.com/sad-animations/img/100/sleepy/sleepy.png", 
            textSection: <p>Hammerlock</p>,
        },        
    ];

    const cardData = categoryType === 'hands' ? handsData : positionsData;

    return (
        <div className="d-flex flex-column align-items-center">
            <div className="top-nav mb-5">
                <ProgressBar progress={2}/>
                <BackButton text={"Category type"} to={"/category-type"}/>
            </div>

            <h1 className="mb-5">
                <span style={{ textTransform: 'capitalize' }}>{categoryType}</span>
                <span> category</span>
            </h1>

            <CardsContainer 
                cards={
                    <>
                        {cardData.map((data, index) => (
                            <Card key={index} image={data.image} textSection={data.textSection} />
                        ))}
                    </>   
                }> 
            </CardsContainer>
        </div>
    )
}