import Image from 'next/image'
import Link from 'next/link'

// components
import { FaArrowLeft } from 'react-icons/fa'

const PropertyHeaderImage = ({ image, alt }) => {
  return (
    <>
      <section>
        <div className='container-xl m-auto'>
          <div className='grid grid-cols-1'>
            <Image
              src={`/images/properties/${image}`}
              alt={alt}
              className='object-cover h-[400px] w-full'
              width={0}
              height={0}
              sizes='100vw'
              priority={true}
            />
          </div>
        </div>
      </section>
      <section>
        <div className='container m-auto py-6 px-6'>
          <Link
            href='/properties'
            className='text-blue-500 hover:text-blue-600 flex items-center'
          >
            <FaArrowLeft className='mr-2' /> Back to Properties
          </Link>
        </div>
      </section>
    </>
  )
}

export default PropertyHeaderImage
