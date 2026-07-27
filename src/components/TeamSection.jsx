import React from 'react';

export default function TeamSection() {
    const teamMembers = [
        { name: "MD NASRULLAH", role: "রিসার্চ ও ফতোয়া টিম", img: "/assets/images/md nasrullah.jpg" },
        { name: "ABDUL BARI", role: "রিসার্চ ও ফতোয়া টিম", img: "/assets/images/abdul bari bin solaiman.jpeg" },
        { name: "WASIM AKRAM", role: "রিসার্চ ও ফতোয়া টিম", img: "/assets/images/wasim akram.jpg" },
        { name: "KURBAN ALI", role: "রিসার্চ ও ফতোয়া টিম", img: "/assets/images/IMG-20260722-WA0000.jpg" }
    ];

    return (
        <section id="about" className="mt-20 pt-12 border-t border-slate-200">
            <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="text-xs font-bold text-teal-600 tracking-wider uppercase bg-teal-50 px-3 py-1 rounded-full">
                    গবেষণা ও পরামর্শক
                </span>
                <h2 className="text-2xl font-bold text-slate-900 mt-3">আমাদের টিম</h2>
                <p className="text-slate-500 text-xs md:text-sm mt-1">
                    যাঁদের আন্তরিক প্রচেষ্টা ও তাত্ত্বিক তত্ত্বাবধানে প্লাটফর্মটি পরিচালিত হচ্ছে
                </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {teamMembers.map((member, idx) => (
                    <div key={idx} className="flex flex-col items-center text-center group">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full p-1 bg-gradient-to-b from-slate-200 to-transparent group-hover:from-teal-500 transition-all mb-3 shadow-sm">
                            <img
                                src={member.img}
                                alt={member.name}
                                className="w-full h-full object-cover rounded-full bg-slate-100"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://via.placeholder.com/150";
                                }}
                            />
                        </div>
                        <h3 className="text-xs md:text-sm font-bold text-slate-800">{member.name}</h3>
                        <span className="text-[11px] text-slate-400 mt-0.5">{member.role}</span>
                    </div>
                ))}
            </div>
            <div className="mt-12 flex flex-col items-center text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest bg-slate-100 px-3 py-1 rounded-md mb-4">
                    ডেভেলপার
                </span>

                <div className="group flex flex-col items-center">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full p-1 bg-gradient-to-b from-slate-200 to-transparent group-hover:from-teal-500 transition-all mb-3 shadow-sm">
                        <img
                            src="/assets/images/sakib ahmed sde.png"
                            alt="Sakib Ahmed"
                            className="w-full h-full object-cover rounded-full bg-slate-100"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://via.placeholder.com/150";
                            }}
                        />
                    </div>
                    <h3 className="text-xs md:text-sm font-bold text-slate-800">SAKIB AHMED</h3>
                </div>
            </div>

        </section>
    );
}