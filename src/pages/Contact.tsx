import { Button } from "@/components/ui/button";

const Contact = () => {
    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-6 container mx-auto py-10 lg:py-20">
                <div className="flex lg:flex-col justify-center col-span-1 lg:gap-20 mb-5 lg:mb-0">
                    <img
                        src="https://i.pinimg.com/736x/9f/46/74/9f4674ca9c17330ab419c1b2f5951d9a.jpg"
                        alt="user-image"
                        className="w-12 h-12 rounded-full object-cover"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = "https://placehold.co/48x48/6B7280/FFFFFF?text=AA";
                        }}
                    />
                    <img
                        src="https://i.pinimg.com/736x/57/3c/80/573c80967c9429d0ed0ce32701f85b70.jpg"
                        className="w-12 h-12 rounded-full object-cover"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = "https://placehold.co/48x48/6B7280/FFFFFF?text=AA";
                        }}
                    />
                    <img
                        src="https://i.pinimg.com/736x/b0/c4/21/b0c421e77cf563962026ade82c90dd5b.jpg"
                        alt="user-image"
                        className="w-12 h-12 rounded-full object-cover self-center"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = "https://placehold.co/48x48/6B7280/FFFFFF?text=AA";
                        }}
                    />
                </div>
                <div className="col-span-4 text-center space-y-10 p-5 lg:p-0">

                    <h2 className="text-3xl font-semibold lg:font-medium lg:text-6xl">Your Sneakers Journey Deserves Expert Support</h2>
                    <p className="lg:px-20">At Sole Heaven, we’re more than just a sneaker store — we’re your partners in finding the perfect fit, style, and comfort for every step. Whether you have a question about sizing, need help with an order, or simply want sneaker care advice, our team is here to guide you.</p>
                    <Button>Explore Our Support</Button>
                </div>
                <div className="flex lg:flex-col justify-center col-span-1 lg:gap-20 mt-10 lg:mt-0">
                    <img
                        src="https://i.pinimg.com/736x/6f/a3/6a/6fa36aa2c367da06b2a4c8ae1cf9ee02.jpg"
                        alt="user-image"
                        className="w-12 h-12 rounded-full object-cover self-center"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = "https://placehold.co/48x48/6B7280/FFFFFF?text=AA";
                        }}
                    />
                    <img
                        src="https://i.pinimg.com/736x/8c/6d/db/8c6ddb5fe6600fcc4b183cb2ee228eb7.jpg"
                        alt="user-image"
                        className="w-12 h-12 rounded-full object-cover self-end"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = "https://placehold.co/48x48/6B7280/FFFFFF?text=AA";
                        }}
                    />
                    <img
                        src="https://i.pinimg.com/736x/81/d6/b1/81d6b158728f5fc97ca6e0a025fefee0.jpg"
                        alt="user-image"
                        className="w-12 h-12 rounded-full object-cover"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = "https://placehold.co/48x48/6B7280/FFFFFF?text=AA";
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Contact;