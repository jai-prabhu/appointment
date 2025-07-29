/* eslint-disable @next/next/no-img-element */
export default function Header() {

    return (
        <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 left-0 max-w-screen">
            <div className="container flex mx-auto px-4 justify-between items-center w-full">
                
                <div className="inline-flex items-center">
                    <img
                    src="/Logo.png"
                    alt="Logo"
                    className="w-18 h-auto"/>
                    <h1 className="text-slate-900 text-lg font-semibold tracking-wide">Schedula</h1>
                </div>

                <nav className="md:inline-flex gap-4 items-center hidden">
                    <h3 className="text-gray-500">Features</h3>
                    <h3 className="text-gray-500">How it Works</h3>
                    <h3 className="text-gray-500">About</h3>
                    <a className="text-black border border-gray-500/30 px-4 py-2 rounded-lg
                    hover:bg-gray-300/10"
                    href="">
                        Sign in
                    </a>
                    <a className="text-white border bg-teal-600 border-gray-500/30 px-4 py-2 rounded-lg
                    hover:bg-teal-700"
                    href="">
                        Get Started
                    </a>
                </nav>
            </div>
        </header>
    );
}