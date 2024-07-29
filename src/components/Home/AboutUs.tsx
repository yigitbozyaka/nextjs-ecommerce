function AboutUs() {

  const aboutParagraphs = [
    {
      title: "Great RV Selection",
      description: "We have a wide variety of premium RVs conveniently located in Munich, Germany. You're sure to find one that suits your travel preferences."
    },
    {
      title: "Safe and Clear Payments",
      description: "Your peace of mind matters to us. We handle your payments securely and transparently through a dedicated trust account."
    },
    {
      title: "Quick RV Delivery",
      description: "We prioritize getting your chosen RV to you fast. It typically arrives within 7-9 days of payment confirmation."
    },
    {
      title: "Try Before You Buy",
      description: "We want you to be completely satisfied. That's why we offer a generous 10 day trial period. Take your time to get to know your RV."
    },
    {
      title: "Affordable Delivery",
      description: "Our delivery rates are budget-friendly, with the first 200 km free and a low 50 cents per km afterward."
    },
    {
      title: "Explore the Open Road with Confidence",
      description: "Discover an extensive selection of top-tier RVs at our prime location in Munich, Germany."
    }
  ]

  return (
    <div className="min-h-screen flex flex-col mx-8 xl:mx-0 py-36 justify-evenly items-center">
      <div className="flex flex-col items-center gap-4">
        <h2 className="font-bold text-3xl text-orange-400 text-center">
          About HighwayHomes
        </h2>
        <p className="text-base max-w-2xl text-gray-600 text-center">
          Welcome to HighwayHomes, your trusted destination for
          exceptional RVs. Our goal is straightforward: to make your RV
          ownership experience smooth and enjoyable from start to finish.
        </p>
      </div>

      <h3 className="text-2xl font-bold my-8 text-center">What makes us special?</h3>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-8">
        {aboutParagraphs.map((p, index) => (
          <div key={index} className="flex flex-col items-center drop-shadow-[0_6px_12px_rgba(255,138,86,0.4)] bg-gray-200/80 text-black rounded-lg p-4 gap-2">
            <p className="font-bold text-center">{p.title}</p>
            <p className="border-t border-gray-400 pt-2 text-gray-700">
              {p.description}
            </p>
          </div>

        ))}
      </div>
    </div>
  );
}

export default AboutUs;
