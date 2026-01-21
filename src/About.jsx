export default function About(){
    const missions = [
        {
            text: "Menyediakan Data Akurat dan Terkini.",
            icon: "./data.png"
        },
        {
            text: "Menfasilitasi Pembelajaran Interaktif.",
            icon: "./education.png"
        },
        {
            text: "Mendorong Eksplorasi Global.",
            icon: "./compass.png"
        },
        {
            text: "Membangun Komunitas Pengguna",
            icon: "./communities.png"
        },
    ]

    const teams = [
        {
            name: "John Doe",
            icon: "./people.png",
            role: "UI/UX Designer"
        },
        {
            name: "John Doe",
            icon: "./people.png",
            role: "UI/UX Designer"
        },
        {
            name: "John Doe",
            icon: "./people.png",
            role: "Front-End Developer"
        },
        {
            name: "John Doe",
            icon: "./people.png",
            role: "Front-End Developer"
        },
        {
            name: "John Doe",
            icon: "./people.png",
            role: "Back-End Developer"
        },
        {
            name: "John Doe",
            icon: "./people.png",
            role: "Back-End Developer"
        },
    ]
    
    return(
        <div>
            <div className="rounded-lg flex justify-center">
                <h1 className="font-bold text-center text-3xl md:text-5xl bg-cyan-100 p-3 m-3 rounded-xl text-blue-700 drop-shadow-lg">About WorldUniversity</h1>
            </div>

            <p className="bg-green-200 p-2 rounded-md w-100 flex flex-col justify-center">
                <span className="text-blue-700 font-bold text-xl">World University</span> adalah sebuah platform pembelajaran global yang dirancang untuk membantu siapa saja
                mengakses pengetahuan dari berbagai bidang. Kami percaya bahwa
                pendidikan adalah kunci untuk membuka peluang dan menciptakan masa
                depan yang lebih baik
            </p>

            {/* VISI */}
            <div>
                <h2 className="text-blue-700 font-bold text-4xl mt-5 text-center">Visi</h2>
                <p className="bg-green-200 p-2 rounded-md w-100">Menjadi sumber informasi geografis dan demografis terdepan yang menyajikan data komprehensif secara terstruktur dan intuitif untuk pelajar, peneliti, dan masyarakat global.                </p>
            </div>

            {/* MISI */}
            <div>
                <h2 className="text-blue-700 font-bold text-4xl my-3 mt-5 text-center">Misi</h2>

                <ul className="flex flex-col md:flex-row items-center gap-6">
                    {missions.map((mission, index) => (
                        <li key={index} className="text-center flex flex-col w-48">
                            <div>
                                <img src={mission.icon} alt="mission icon" className="w-8 h-8 mx-auto" />
                            </div>

                            <p>{mission.text}</p>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Developer Tim */}
            <div>
                <h2 className="text-blue-700 font-bold text-4xl my-6 text-center">Tim Developer</h2>

                <ul className="flex flex-wrap justify-around gap-6">
                    {teams.map((team, index) => (
                        <li key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out flex flex-col items-center text-center w-48">
                            <div className="w-24 h-24 bg-gray-200 rounded-full mb-4">
                                <img src={team.icon} alt="team icon" className="object-cover rounded-full " />
                            </div>

                            <p>{team.name}</p>
                            <p>{team.role}</p>
                        </li>        
                    ))}
                </ul>
            </div>
        </div>
    )
}