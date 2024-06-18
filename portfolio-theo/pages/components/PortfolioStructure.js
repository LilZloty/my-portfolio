import Image from "next/image";
import Link from 'next/link';

export default function PortfolioStructure({ title, imageSrc, altText, description, link, technologies }) {
  return (
    <div className="portfolio-item rounded-lg shadow-lg overflow-hidden transition duration-100 transform hover:bg-gray-100 hover:shadow-md docs-card">
      <div className="relative">
      <div className="image-container">
       <Image
            className="rounded-lg object-cover shadow-lg transition-opacity duration-500 hover:opacity-40"
            src={imageSrc}
            alt={altText}
            width={1000}
            height={400}
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center information-tab">
          <div className="p-4 bg-transparent transition-opacity duration-500 opacity-0 hover:opacity-100 hover:bg-[#000000eb] rounded-lg h-full flex flex-col items-center justify-center">
            <h2 className="text-[#595CFF] text-xl mb-2">
              <Link href={link}>{title}</Link>
            </h2>
            <p className="text-white text-center mb-4">{description}</p>
            <h3 className="text-[#595CFF] mb-2">Technology Stack</h3>
            <ul className="text-white text-sm">
              {technologies.map((tech, techIndex) => (
                <li key={tech + techIndex}>{tech}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}