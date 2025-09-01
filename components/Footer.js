export default function Footer() {
  return (
       
     
      <footer className="relative z-20 p-3 sm:p-4 md:p-6">
        <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 text-xs">
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-white/50">
              <span>status: <span className="text-green-400">online</span></span>
              <span>version: <span className="text-[#A64D79]">v2.1.0</span></span>
              <span className="hidden sm:inline">uptime: <span className="text-blue-400">99.9%</span></span>
            </div>
            <div className="text-white/40 text-xs">
              powered_by: Asma_Tariq
            </div>
          </div>
        </div>
      </footer>
  );
}
