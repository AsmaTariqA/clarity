// // /app/results/page.js
// 'use client'
// import { useSearchParams } from 'next/navigation'
// import { useEffect, useState } from 'react'
// import { calculateClarityScore } from '../../lib/logic'

// export default function ResultsPage() {
//   const searchParams = useSearchParams()
//   const [result, setResult] = useState(null)

//   useEffect(() => {
//     const data = {
//       decision: searchParams.get('decision') || '',
//       priorities: searchParams.getAll('priorities'),
//       pros: searchParams.get('pros')?.split(',') || [],
//       cons: searchParams.get('cons')?.split(',') || [],
//       gutFeeling: Number(searchParams.get('gutFeeling') || 5),
//       alignment: Number(searchParams.get('alignment') || 5),
//       risk: searchParams.get('risk') || 'Medium',
//     }

//     const calculated = calculateClarityScore(data)
//     setResult({ ...calculated, ...data })
//   }, [searchParams])

//   if (!result) return (
//     <div className="flex items-center justify-center min-h-screen">
//       <div className="text-center">
//         <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#98A1BC]"></div>
//         <p className="mt-4 text-[#555879]">Calculating your clarity score...</p>
//       </div>
//     </div>
//   )

//   return (
//     <div className="max-w-2xl mx-auto p-8 min-h-screen">
//       <div className="glass-panel p-8 rounded-3xl">
//         <h1 className="text-3xl font-bold text-[#555879] mb-2">Decision Clarity Report</h1>
//         <p className="text-lg text-[#555879]/80 mb-8">For: "{result.decision}"</p>
        
//         {/* Score Display */}
//         <div className="mb-8 text-center">
//           <div className="inline-flex items-center justify-center relative">
//             <svg className="w-32 h-32">
//               <circle
//                 className="text-[#DED3C4]"
//                 strokeWidth="8"
//                 stroke="currentColor"
//                 fill="transparent"
//                 r="56"
//                 cx="64"
//                 cy="64"
//               />
//               <circle
//                 className={`${
//                   result.signal === 'green' ? 'text-green-500' :
//                   result.signal === 'yellow' ? 'text-yellow-500' : 'text-red-500'
//                 }`}
//                 strokeWidth="8"
//                 strokeDasharray={`${result.score * 3.14} 350`}
//                 strokeLinecap="round"
//                 stroke="currentColor"
//                 fill="transparent"
//                 r="56"
//                 cx="64"
//                 cy="64"
//               />
//             </svg>
//             <span className="absolute text-3xl font-bold">
//               {result.score}
//             </span>
//           </div>
          
//           <div className={`inline-block px-4 py-2 rounded-full text-white text-sm font-medium mt-4 ${
//             result.signal === 'green' ? 'bg-green-500' :
//             result.signal === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'
//           }`}>
//             {result.signal.toUpperCase()}
//           </div>
          
//           <p className="mt-4 text-[#555879]">
//             {result.signal === 'green' 
//               ? 'Strong indication to proceed!' 
//               : result.signal === 'yellow' 
//                 ? 'Consider carefully before deciding' 
//                 : 'Strong reasons to reconsider'}
//           </p>
//         </div>

//         {/* Breakdown */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//           <div className="glass-panel p-6 rounded-xl">
//             <h3 className="font-semibold text-[#555879] mb-4">Pros</h3>
//             <ul className="space-y-2">
//               {result.pros.map((pro, i) => (
//                 <li key={i} className="flex items-start">
//                   <span className="text-green-500 mr-2">✓</span>
//                   <span>{pro}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
          
//           <div className="glass-panel p-6 rounded-xl">
//             <h3 className="font-semibold text-[#555879] mb-4">Cons</h3>
//             <ul className="space-y-2">
//               {result.cons.map((con, i) => (
//                 <li key={i} className="flex items-start">
//                   <span className="text-red-500 mr-2">✗</span>
//                   <span>{con}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* Metrics */}
//         <div className="glass-panel p-6 rounded-xl">
//           <h3 className="font-semibold text-[#555879] mb-4">Key Metrics</h3>
//           <div className="space-y-4">
//             <div>
//               <div className="flex justify-between mb-1">
//                 <span>Priorities Matched</span>
//                 <span>{result.priorities.length} of 5</span>
//               </div>
//               <div className="w-full bg-[#DED3C4] rounded-full h-2.5">
//                 <div 
//                   className="bg-[#98A1BC] h-2.5 rounded-full" 
//                   style={{ width: `${(result.priorities.length / 5) * 100}%` }}
//                 ></div>
//               </div>
//             </div>
            
//             <div>
//               <div className="flex justify-between mb-1">
//                 <span>Gut Feeling</span>
//                 <span>{result.gutFeeling}/10</span>
//               </div>
//               <div className="w-full bg-[#DED3C4] rounded-full h-2.5">
//                 <div 
//                   className="bg-[#98A1BC] h-2.5 rounded-full" 
//                   style={{ width: `${result.gutFeeling * 10}%` }}
//                 ></div>
//               </div>
//             </div>
            
//             <div>
//               <div className="flex justify-between mb-1">
//                 <span>Goal Alignment</span>
//                 <span>{result.alignment}/10</span>
//               </div>
//               <div className="w-full bg-[#DED3C4] rounded-full h-2.5">
//                 <div 
//                   className="bg-[#98A1BC] h-2.5 rounded-full" 
//                   style={{ width: `${result.alignment * 10}%` }}
//                 ></div>
//               </div>
//             </div>
            
//             <div>
//               <div className="flex justify-between">
//                 <span>Risk Level</span>
//                 <span className={`font-medium ${
//                   result.risk === 'High' ? 'text-red-500' :
//                   result.risk === 'Medium' ? 'text-yellow-500' : 'text-green-500'
//                 }`}>
//                   {result.risk}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
'use client'
import { useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'

export default function Results() {
  const params = useSearchParams()
  const aiOutput = params.get('aiOutput') || "No guidance received. Try again 🚀"
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const messages = useMemo(() => {
    const lines = aiOutput.split("\n")
    let msgs = []
    let currentSection = ""
    let currentTitle = ""
    
    lines.forEach(line => {
      const trimmedLine = line.trim()
      
      if (/^(Summary|Key Considerations|Short-term Steps|Long-term Guidance|Final Recommendation)/i.test(trimmedLine)) {
        if (currentSection.trim()) {
          msgs.push({ 
            role: "ai", 
            text: `💡 ${currentTitle}\n\n${currentSection.trim()}` 
          })
        }
        currentTitle = trimmedLine
        currentSection = ""
      } else if (trimmedLine) {
        currentSection += (currentSection ? "\n" : "") + trimmedLine
      }
    })
    
    if (currentSection.trim()) {
      msgs.push({ 
        role: "ai", 
        text: `💡 ${currentTitle}\n\n${currentSection.trim()}` 
      })
    }
    
    if (msgs.length === 0) {
      msgs.push({ role: "ai", text: aiOutput })
    }
    
    return msgs
  }, [aiOutput])

  const nextSection = () => {
    setCurrentIndex((prev) => (prev + 1) % messages.length)
  }

  const prevSection = () => {
    setCurrentIndex((prev) => (prev - 1 + messages.length) % messages.length)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#1A1A1D] via-[#3B1C32] to-[#6A1E55] text-white font-mono">
      {/* Header */}
      <header className="p-4 sm:p-6 text-center bg-black/10 backdrop-blur-xl border-b border-white/20">
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#A64D79] to-white bg-clip-text text-transparent">
          AI Decision Results
        </h1>
        <p className="text-xs sm:text-sm text-gray-300 mt-2 font-light">
          Section {currentIndex + 1} of {messages.length}
        </p>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-4xl">
          {/* Progress Dots */}
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="flex space-x-2">
              {messages.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                    i === currentIndex 
                      ? 'bg-gradient-to-r from-[#A64D79] to-[#6A1E55] scale-125 shadow-lg shadow-[#A64D79]/50' 
                      : 'bg-white/20 backdrop-blur-sm'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Message Box */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-white/20 shadow-2xl min-h-[250px] sm:min-h-[400px] flex items-center">
            <div className="w-full">
              <div className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap text-gray-100">
                {messages[currentIndex]?.text || "Loading..."}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-3">
            <button
              onClick={prevSection}
              disabled={messages.length <= 1}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl font-semibold hover:bg-white/15 hover:scale-105 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-white/10"
            >
              ← Previous
            </button>

            <div className="text-center text-xs sm:text-sm text-white/60 font-light">
              Tap or click buttons to navigate
            </div>

            <button
              onClick={nextSection}
              disabled={messages.length <= 1}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl font-semibold hover:bg-white/15 hover:scale-105 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-white/10"
            >
              Next →
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-3 sm:p-4 flex justify-center gap-4 bg-black/20 backdrop-blur-sm border-t border-white/10">
        <button
          onClick={() => window.history.back()}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-gray-600 to-gray-700 rounded-xl font-semibold hover:scale-105 transition-all duration-200 flex items-center gap-2"
        >
          Go Back
        </button>
      </footer>
    </div>
  )
}
