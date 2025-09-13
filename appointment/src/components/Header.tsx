/* eslint-disable @next/next/no-img-element */
export default function Header() {

    return (
        <header className="border-b bg-white/80 w-full backdrop-blur-sm z-10 sticky top-0 left-0 max-w-screen z-30">
            <div className="container flex mx-auto px-4 justify-between items-center w-full">
                
                <div className="inline-flex items-center">
                    <img
                    src="/Logo.png"
                    alt="Logo"
                    className="w-18 h-auto"/>
                    <h1 className="md:block hidden text-slate-900 text-lg font-semibold tracking-wide">Schedula</h1>
                </div>

                <nav className="md:inline-flex gap-4 items-center hidden">
                    <a href="#features" className="text-gray-500">Features</a>
                    <a href="#how-it-works" className="text-gray-500">How it Works</a>
                    <a href="#about" className="text-gray-500">About</a> 
                </nav>

                <div className="inline-flex items-center gap-4">
                    <a 
                    className="text-black border border-gray-500/30 px-4 py-2 rounded-lg
                    hover:bg-gray-300/10"
                    href="/login">
                        Sign in
                    </a>
                    <a className="text-white border bg-teal-600 border-gray-500/30 px-4 py-2 rounded-lg
                    hover:bg-teal-700"
                    href="">
                        Get Started
                    </a>
                </div>
            </div>
        </header>
    );
}