/* eslint-disable @next/next/no-img-element */
export default function Footer () {

    return (
        <footer className="py-8 px-4 bg-slate-900 print:hidden">
            <div className="container max-w-6xl mx-auto">
                <div className="space-y-4">
                    <div className="flex md:flex-row flex-col gap-8 items-start border-b border-slate-700">
                        <div className="text-start">
                            <div className="inline-flex items-center">
                                <img
                                src="/Logo.png"
                                alt="Logo"
                                className="w-16 h-16"/>
                                <h3 className="text-lg font-bold">Schedula</h3>
                            </div>
                            <p className="pl-4 max-w-sm mx-auto text-slate-300">
                                Making healthcare accessible and
                                convenient for everyone.
                            </p>
                        </div>
                        <div className="flex md:flex-row flex-col px-4 py-4 gap-4 justify-between w-full">
                            <div className="text-start space-y-4">
                                <h2 className="text-whtie font-bold text-lg">Product</h2>
                                <h3 className="text-slate-300">Features</h3>
                                <h3 className="text-slate-300 ">Pricing</h3>
                                <h3 className="text-slate-300">Security</h3>
                            </div>
                            <div className="text-start space-y-4">
                                <h2 className="text-whtie font-bold text-lg">Company</h2>
                                <h3 className="text-slate-300">About</h3>
                                <h3 className="text-slate-300">Careers</h3>
                                <h3 className="text-slate-300">Contact</h3>
                            </div>
                            <div className="text-start space-y-4">
                                <h2 className="text-whtie font-bold text-lg">Support</h2>
                                <h3 className="text-slate-300">Help Center</h3>
                                <h3 className="text-slate-300">Privacy Policy</h3>
                                <h3 className="text-slate-300">Terms of Service</h3>
                            </div>
                        </div>
                    </div>
                    <h2 className="text-slate-300 text-center">© 2025 Schedula. All rights reserved.</h2>
                </div>
            </div>
        </footer>
    );
}