// 2x2 grid section - top left and bottom right have text and buttons, top right and bottom left have images
import Image from "next/image"; 

export default function SectionGrid( props ) {
    return (
        <section className="bg-gray-100 py-16 mt-20 mb-16 rounded-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 px-4">
              {/* Top Left Block */}
              <div className="flex flex-col justify-start">
                <div className="w-[70%] m-auto">
                  <h3 className="text-2xl font-bold mb-4 dark:text-black">{props.titleA}</h3>
                  <p className="text-gray-600 mb-4">
                    {props.descriptionA}
                  </p>
                  <button className="border border-green-500 text-green-500 px-4 py-2 rounded-full hover:bg-green-500 hover:text-white transition-all cursor-pointer">
                    {props.buttonTextA}
                  </button>
                </div>
              </div>

              {/* Top Right Block */}
              <div className="relative h-40 md:h-70">
                <Image
                    src={props.imageSrcA}
                    alt="Top Right Image"
                    className="w-full h-full rounded-lg shadow-lg object-cover"
                    loading="eager"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Bottom Left Block */}
              <div className="relative">
                <div className="relative h-40 md:h-70">
                  <Image
                      src={props.imageSrcB}
                      alt="Bottom left image"
                      className="w-full h-full rounded-lg shadow-lg object-cover"
                      loading="eager"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>

              {/* Bottom Right Block */}
              <div className="flex flex-col justify-start">
                <div className="w-[70%] m-auto">
                  <h3 className="text-2xl font-bold mb-4 dark:text-black">{props.titleB}</h3>
                  <p className="text-gray-600 mb-4">
                    {props.descriptionB}
                  </p>
                  <button className="border border-green-500 text-green-500 px-4 py-2 rounded-full hover:bg-green-500 hover:text-white transition-all cursor-pointer">
                    {props.buttonTextB}
                  </button>
                </div>
              </div>
            </div>
        </section>
    );
}