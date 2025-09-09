import shopImage from "@/assets/images/shop-image.jpg"

const About = () => {
    return (
        <div className="px-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 container mx-auto py-10">
                <div className="flex flex-col gap-10 justify-center">
                    <span className="border rounded-full px-2 py-1 w-fit text-sm">OUR STORY</span>
                    <h2 className="text-6xl">
                        Ultimate destination for premium footwear, combining style, comfort
                    </h2>
                    <p>We are passionate about helping every step of your journey feel extraordinary—whether it’s casual wear, sports, or luxury collections. Our mission is to provide footwear that not only looks good but also feels perfect for every occasion.</p>
                </div>
                <div className="space-y-10">
                    <div className="border-b border-primary/10 flex items-center gap-5 pl-10 pb-5">
                        <div>
                            <span className="text-7xl text-primary">6</span>
                        </div>
                        <div>
                            <span>inspiring locations</span>
                        </div>
                    </div>
                    <div className="border-b border-primary/10 flex items-center gap-5 pl-10 pb-5">
                        <div>
                            <span className="text-7xl text-primary">7</span>
                        </div>
                        <div>
                            <span>years of empowering entrepreneurs</span>
                        </div>
                    </div>
                    <div className="border-b border-primary/10 flex items-center gap-5 pl-10 pb-5">
                        <div>
                            <span className="text-7xl text-primary">80</span>
                        </div>
                        <div>
                            <span>passionate team members</span>
                        </div>
                    </div>
                    <div className="border-b border-primary/10 flex items-center gap-5 pl-10 pb-5">
                        <div>
                            <span className="text-7xl text-primary">2.5K+</span>
                        </div>
                        <div>
                            <span>thriving members</span>
                        </div>
                    </div>
                    <div className="border-b border-primary/10 flex items-center gap-5 pl-10 pb-5">
                        <div>
                            <span className="text-7xl text-primary">25K+</span>
                        </div>
                        <div>
                            <span>sqm of flexible workspace</span>
                        </div>
                    </div>
                    <div className="border-b border-primary/10 flex items-center gap-5 pl-10 pb-5">
                        <div>
                            <span className="text-7xl text-primary">$5M</span>
                        </div>
                        <div>
                            <span>turnover</span>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <img src={shopImage} alt="shop-image" className="max-w-5xl w-full mx-auto rounded-md shadow shadow-primary" />
            </div>
        </div>
    );
};

export default About;