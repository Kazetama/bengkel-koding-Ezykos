import React from 'react';

interface EzykosHeroProps {
    className?: string;
}

const EzykosHero: React.FC<EzykosHeroProps> = ({ className = '' }) => {
    return (
        <section className={`bg-white dark:bg-gray-900 ${className}`}>
            <div className="container mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
                <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-12 items-center">

                    <div className="text-center lg:text-left">
                        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                            <span className="block">Temukan Kos Impianmu</span>
                            <span className="block text-blue-600 dark:text-blue-500">
                                dengan Ezykos.
                            </span>
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                            Platform termudah untuk mencari, membandingkan, dan memesan kamar
                            kos berkualitas di seluruh Indonesia. Mulai hidup mandirimu tanpa repot.
                        </p>

                        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            <a
                                href="#"
                                className="w-full sm:w-auto rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors duration-300 ease-in-out"
                            >
                                Cari Kos Sekarang
                            </a>
                            <a
                                href="/register"
                                className="w-full sm:w-auto rounded-lg border border-gray-300 dark:border-gray-600 px-6 py-3 text-base font-semibold text-gray-900 dark:text-white shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300 ease-in-out"
                            >
                                Daftar sebagai Pemilik
                            </a>
                        </div>
                    </div>

                    <div className="relative flex h-80 w-full items-center justify-center rounded-xl bg-gray-100 shadow-xl dark:bg-gray-800 lg:h-full lg:min-h-[500px]">
                        <img
                            className="h-full w-full rounded-xl object-cover"
                            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1470&q=80"
                            alt="Interior kamar kos yang modern dan bersih"
                        />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default EzykosHero;
