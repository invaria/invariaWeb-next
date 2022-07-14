import Link from 'next/link'

const Footer = () => (
  <footer className="h-[148px] sm:h-[81px] border-t border-[#44334C] py-8 text-sm font-semibold text-white ">
    <div className="flex flex-col justify-between sm:flex-row sm:px-auto px-[30px] sm:px-[30px] md:px-[130px] lg:px-[230px]">
      <p className="text-invar-grey select-none">© 2022 InVaria 2222</p>
      <div className="flex flex-col-reverse sm:flex-row mt-4 sm:mt-0 justify-center">
        <div>
          <Link href="/terms">
            <p className="mb-8 sm:mb-auto sm:mr-6 hover:underline cursor-pointer">
              {`Terms & Conditions`}
            </p>
          </Link>
        </div>

        <div>
          <Link href="/privacy">
            <p className="mb-1 sm:mb-auto hover:underline cursor-pointer">
              Privacy Policy
            </p>
          </Link>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer;