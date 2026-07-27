export default function AlertBar() {
  return (

    <section className="flex items-center justify-between bg-brand-blue text-white px-8 py-2">


        <p className="text-xs md:text-base">
            ⚠ No Current Outages Reported

                |

            View Outage Information →

        </p>
    

        <nav className="hidden md:flex gap-8 bg-brand-blue text-white px-8 py-2">
             <a href="#">
             Report an Outage 24/7
            </a>

            <a href="#">
             Contact Us
            </a>

           </nav>       

    
    </section>
  );
}