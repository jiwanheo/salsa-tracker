import Card from "../components/Cards/Card";
import CardsContainer from "../components/Cards/CardsContainer";

export default function ChooseCategoryTypePage() {
    return (
        <div className="d-flex flex-column align-items-center">
            <h2 className="mb-3">View moves by:</h2>

            <CardsContainer 
                cards={
                    <>
                        <Card
                            image={"https://qotoqot.com/sad-animations/img/100/shy/shy.png"}
                            textSection={
                                <div className="text-start">
                                    <h2>Hands</h2>
                                    <p>7 hand positions</p>
                                </div>
                            } 
                        ></Card>

                        <Card
                            image={"https://qotoqot.com/sad-animations/img/100/insomnia/insomnia.png"}
                            textSection={
                                <div className="text-start">
                                    <h2 className="text-lg font-bold">Positions</h2>
                                    <p className="text-gray-600">Base positions</p>
                                </div>
                            } 
                        ></Card>
                    </>   
                }> 
            </CardsContainer>
        </div>
    )
}