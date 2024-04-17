import Image from 'next/image';
import Link from 'next/link';

export default function PortfolioStructure({ title, imageSrc, altText, description, link, technologies }) {
  return (
    <div className="basis-1/3 flex-1">
      <div className="container relative w-full">
        <div className="image-container h-[500px] w-[600px]">
          <Image
            className="rounded-lg object-cover shadow-lg transition-opacity duration-500 hover:opacity-40"
            src={imageSrc}
            alt={altText}
            layout="fill"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center information-tab">
          <div className="p-4 bg-transparent transition-opacity duration-500 opacity-0 hover:opacity-100 hover:bg-[#000000eb] rounded-lg md:h-full flex flex-col items-center justify-center">
            <h2 className="text-[#595CFF] text-2xl">
              <Link href={link}>{title}</Link>
            </h2>
            <p className="text-white p-10 text-center">{description}</p>
            <h3 className="text-[#595CFF]">Technology Stack</h3>
            <ul className="pb-5">
              {technologies.map((tech, techIndex) => (
                <li key={tech + techIndex}>
                  <p className="text-white">{tech}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
