const Hero = () => {

    const steps = [
        {
            title: 'Browse Our Selection',
            description: 'Start your RV-buying journey by exploring our extensive inventory on the HighwayHomes website.',
        },
        {
            title: 'Add to Cart and Checkout',
            description: 'Once you\'ve found your dream RV and customized it to perfection, add it to your cart and proceed to checkout.',
        },
        {
            title: 'Finalize Your Purchase',
            description: 'After you\'ve added your RV to your cart, you\'ll be prompted to finalize your purchase. This includes entering your personal information and payment details.',
        },
        {
            title: 'Track Your Delivery',
            description: 'After finalizing your purchase, keep tabs on your RV\'s delivery status. HighwayHomes provides a tracking system so you can monitor the progress of your new home on wheels as it makes its way to you.',
        }
    ]

    return (
        <div className='min-h-screen flex flex-col py-36 justify-evenly gap-10 items-center'>
            <div className="flex flex-col items-center">
                <h2 className="text-3xl font-bold text-orange-400">
                    Process
                </h2>
                <h3 className="text-center text-xl font-bold">
                    Easiest way to buy your dream RV
                </h3>
            </div>

            <ul className="infoGraphic flex flex-wrap justify-center">
                {steps.map((step, index) => (
                    <li key={index + 1} className="relative w-full max-w-[25em] rounded-lg p-2 z-10 transition-all cursor-pointer">
                        <div className="absolute">
                            <div className="text-[13em] font-black w-[0.9em] text-center text-orange-400">{index + 1}</div>
                            <div className="rotate-[130deg] absolute w-[18em] h-[15em] left-[-3em] top-[-1em]">
                                <div className="absolute top-[-10%] bg-[#ecf2ff] w-[18em] h-[6em] rounded-[50%_50%_0_0] border-b-2 border-[#f5f8f7] transition-all duration-500"></div>
                            </div>
                        </div>
                        <div className="m-[8em_3em_1em_7em] relative">
                            <h2 className="text-[1.7em] font-medium text-center mb-2 uppercase">{step.title}</h2>
                            <p className="text-gray-700 leading-[1.5em]">{step.description}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Hero