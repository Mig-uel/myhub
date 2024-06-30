'use client'

const Error = ({ error, reset }) => {
  return (
    <main className='text-center p-10'>
      <h2 className='text-3xl font-bold'>Oh, no!</h2>
      <p className='mt-5 p-4'>{error.message}</p>

      <button onClick={reset} className=' bg-blue-700 p-5 rouded'>
        Try again
      </button>
    </main>
  )
}

export default Error
