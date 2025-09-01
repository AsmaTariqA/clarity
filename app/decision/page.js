'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const prioritiesList = ['Time', 'Money', 'Learning', 'Peace', 'Growth']
const prosSuggestions = ['Improves skills', 'Quick results', 'Good pay', 'Networking', 'Career growth']
const consSuggestions = ['Time-consuming', 'Risky', 'Expensive', 'Stressful', 'Uncertain outcome']

export default function DecisionForm() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    pastExperiences: '',
    currentSituation: '',
    currentChallenges: '',
    decision: '',
    priorities: [],
    whyItMatters: '',
    learningStyle: '',
    pros: [],
    cons: [],
    gutFeeling: 5,
    alignment: 5,
    risk: '',
    futureAspirations: '',
    impactSuccess: '',
    impactFailure: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (type === 'checkbox') {
      setForm((prev) => ({
        ...prev,
        [name]: checked
          ? [...prev[name], value]
          : prev[name].filter((i) => i !== value),
      }))
    } else {
      setForm((prev) => ({ ...prev, [name]: value }))
    }
  }

  const toggleItem = (type, item) => {
    setForm((prev) => ({
      ...prev,
      [type]: prev[type].includes(item)
        ? prev[type].filter((i) => i !== item)
        : [...prev[type], item],
    }))
  }

  const validateStep = () => {
    const errs = {}
    if (step === 1) {
      if (!form.pastExperiences) errs.pastExperiences = 'Required'
      if (!form.currentSituation) errs.currentSituation = 'Required'
    }
    if (step === 2) {
      if (!form.decision) errs.decision = 'Required'
      if (form.priorities.length === 0) errs.priorities = 'Select at least one'
    }
    if (step === 3) {
      if (!form.whyItMatters) errs.whyItMatters = 'Required'
      if (!form.learningStyle) errs.learningStyle = 'Required'
    }
    if (step === 4) {
      if (form.pros.length === 0) errs.pros = 'Select at least one pro'
      if (form.cons.length === 0) errs.cons = 'Select at least one con'
    }
    if (step === 5) {
      if (!form.gutFeeling) errs.gutFeeling = 'Rate your gut feeling'
      if (!form.alignment) errs.alignment = 'Rate your alignment'
    }
    if (step === 6) {
      if (!form.risk) errs.risk = 'Select a risk level'
      if (!form.futureAspirations) errs.futureAspirations = 'Required'
      if (!form.impactSuccess) errs.impactSuccess = 'Required'
      if (!form.impactFailure) errs.impactFailure = 'Required'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleNext = () => {
    if (validateStep()) setStep(step + 1)
  }
  const handlePrev = () => setStep(step - 1)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateStep()) return
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/cohere', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ decisionData: form })
      })
      const text = await res.text()
      let data
      try {
        data = JSON.parse(text)
      } catch {
        console.error('Invalid JSON from API:', text)
        alert('AI returned invalid response. Try again.')
        setIsSubmitting(false)
        return
      }
      if (res.ok) {
        router.push(`/results?aiOutput=${encodeURIComponent(data.aiOutput)}`)
      } else {
        console.error('API Error:', data.error)
        alert('AI failed, try again.')
      }
    } catch (err) {
      console.error('Fetch Error:', err)
      alert('Something went wrong. Check console.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const fillTestData = () => {
    setForm({
      pastExperiences: 'I studied computer science and worked on multiple projects.',
      currentSituation: 'Currently working remotely and learning new skills.',
      currentChallenges: 'Time management and prioritizing tasks are tough.',
      decision: 'Should I take a new job offer in AI?',
      priorities: ['Learning', 'Growth'],
      whyItMatters: 'I want to grow my career and skills.',
      learningStyle: 'Hands-on and project-based',
      pros: ['Good pay', 'Career growth'],
      cons: ['Time-consuming', 'Stressful'],
      gutFeeling: 7,
      alignment: 8,
      risk: 'Medium',
      futureAspirations: 'Become an AI specialist and lead projects.',
      impactSuccess: 'Career advancement and financial stability.',
      impactFailure: 'Need to re-evaluate career path but will learn from experience.'
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8 font-mono bg-gradient-to-br from-[#1A1A1D] via-[#3B1C32] to-[#6A1E55] text-white">
      <div className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl relative">
        {/* Background Glow - responsive blur */}
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-tr from-[#6A1E55]/30 via-transparent to-[#A64D79]/20 blur-xl sm:blur-2xl lg:blur-3xl" />
        
        <div className="relative z-10 bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 p-4 sm:p-6 md:p-8 lg:p-10">
          {/* Responsive heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 text-center bg-gradient-to-r from-[#A64D79] to-white bg-clip-text text-transparent leading-tight">
            Career & Education AI Advisor
          </h1>

          {/* Progress indicator */}
          <div className="mb-6 sm:mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs sm:text-sm text-[#A64D79]">Step {step} of 6</span>
              <span className="text-xs sm:text-sm text-white/60">{Math.round((step / 6) * 100)}%</span>
            </div>
            <div className="w-full bg-black/30 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-[#6A1E55] to-[#A64D79] h-2 rounded-full transition-all duration-500"
                style={{ width: `${(step / 6) * 100}%` }}
              />
            </div>
          </div>

          <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>

            {/* Step 1 */}
            {step === 1 && (
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block font-semibold text-[#A64D79] mb-2 text-sm sm:text-base">Past Experiences</label>
                  <textarea
                    name="pastExperiences"
                    value={form.pastExperiences}
                    onChange={handleChange}
                    placeholder="> past_experiences.log()"
                    rows={3}
                    className="w-full p-3 sm:p-4 rounded-xl bg-black/30 border border-white/20 text-white backdrop-blur-sm text-sm sm:text-base resize-none focus:ring-2 focus:ring-[#A64D79] focus:border-transparent transition-all"
                  />
                  {errors.pastExperiences && <p className="text-rose-400 text-xs sm:text-sm mt-1">{errors.pastExperiences}</p>}
                </div>
                <div>
                  <label className="block font-semibold text-[#A64D79] mb-2 text-sm sm:text-base">Current Situation</label>
                  <input
                    type="text"
                    name="currentSituation"
                    value={form.currentSituation}
                    onChange={handleChange}
                    placeholder="> current_situation.log()"
                    className="w-full p-3 sm:p-4 rounded-xl bg-black/30 border border-white/20 text-white backdrop-blur-sm text-sm sm:text-base focus:ring-2 focus:ring-[#A64D79] focus:border-transparent transition-all"
                  />
                  {errors.currentSituation && <p className="text-rose-400 text-xs sm:text-sm mt-1">{errors.currentSituation}</p>}
                </div>
                <div>
                  <label className="block font-semibold text-[#A64D79] mb-2 text-sm sm:text-base">Current Challenges</label>
                  <textarea
                    name="currentChallenges"
                    value={form.currentChallenges}
                    onChange={handleChange}
                    placeholder="> current_challenges.log()"
                    rows={3}
                    className="w-full p-3 sm:p-4 rounded-xl bg-black/30 border border-white/20 text-white backdrop-blur-sm text-sm sm:text-base resize-none focus:ring-2 focus:ring-[#A64D79] focus:border-transparent transition-all"
                  />
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block font-semibold text-[#A64D79] mb-2 text-sm sm:text-base">Decision</label>
                  <input
                    name="decision"
                    value={form.decision}
                    onChange={handleChange}
                    placeholder="> decision.log()"
                    className="w-full p-3 sm:p-4 rounded-xl bg-black/30 border border-white/20 text-white backdrop-blur-sm text-sm sm:text-base focus:ring-2 focus:ring-[#A64D79] focus:border-transparent transition-all"
                  />
                  {errors.decision && <p className="text-rose-400 text-xs sm:text-sm mt-1">{errors.decision}</p>}
                </div>
                <div>
                  <label className="block font-semibold text-[#A64D79] mb-2 text-sm sm:text-base">Priorities</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap gap-2 sm:gap-3 mt-2">
                    {prioritiesList.map((p) => (
                      <label
                        key={p}
                        className={`px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl cursor-pointer border transition-all text-xs sm:text-sm md:text-base text-center
                          ${form.priorities.includes(p)
                            ? 'bg-gradient-to-r from-[#6A1E55]/40 to-[#A64D79]/40 border-[#A64D79]'
                            : 'bg-black/30 border-white/20 hover:bg-[#6A1E55]/20'}` }
                      >
                        <input type="checkbox" name="priorities" value={p} checked={form.priorities.includes(p)} onChange={handleChange} className="hidden"/>
                        <span className="block">{p}</span>
                      </label>
                    ))}
                  </div>
                  {errors.priorities && <p className="text-rose-400 text-xs sm:text-sm mt-1">{errors.priorities}</p>}
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block font-semibold text-[#A64D79] mb-2 text-sm sm:text-base">Why it Matters</label>
                  <textarea
                    name="whyItMatters"
                    value={form.whyItMatters}
                    onChange={handleChange}
                    placeholder="> why_it_matters.log()"
                    rows={3}
                    className="w-full p-3 sm:p-4 rounded-xl bg-black/30 border border-white/20 text-white backdrop-blur-sm text-sm sm:text-base resize-none focus:ring-2 focus:ring-[#A64D79] focus:border-transparent transition-all"
                  />
                  {errors.whyItMatters && <p className="text-rose-400 text-xs sm:text-sm mt-1">{errors.whyItMatters}</p>}
                </div>
                <div>
                  <label className="block font-semibold text-[#A64D79] mb-2 text-sm sm:text-base">Learning Style</label>
                  <input
                    type="text"
                    name="learningStyle"
                    value={form.learningStyle}
                    onChange={handleChange}
                    placeholder="> learning_style.log()"
                    className="w-full p-3 sm:p-4 rounded-xl bg-black/30 border border-white/20 text-white backdrop-blur-sm text-sm sm:text-base focus:ring-2 focus:ring-[#A64D79] focus:border-transparent transition-all"
                  />
                  {errors.learningStyle && <p className="text-rose-400 text-xs sm:text-sm mt-1">{errors.learningStyle}</p>}
                </div>
              </div>
            )}

            {/* Step 4 */}
            {step === 4 && (
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block font-semibold text-[#A64D79] mb-2 text-sm sm:text-base">Pros</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap gap-2 sm:gap-3 mt-2">
                    {prosSuggestions.map((p) => (
                      <label key={p} className={`px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl cursor-pointer border transition-all text-xs sm:text-sm md:text-base text-center lg:text-left ${form.pros.includes(p) ? 'bg-[#6A1E55]/40 border-[#A64D79]' : 'bg-black/30 border-white/20 hover:bg-[#6A1E55]/20'}`}>
                        <input type="checkbox" name="pros" value={p} checked={form.pros.includes(p)} onChange={handleChange} className="hidden"/>
                        <span className="block">{p}</span>
                      </label>
                    ))}
                  </div>
                  {errors.pros && <p className="text-rose-400 text-xs sm:text-sm mt-1">{errors.pros}</p>}
                </div>

                <div>
                  <label className="block font-semibold text-[#A64D79] mb-2 text-sm sm:text-base">Cons</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap gap-2 sm:gap-3 mt-2">
                    {consSuggestions.map((c) => (
                      <label key={c} className={`px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl cursor-pointer border transition-all text-xs sm:text-sm md:text-base text-center lg:text-left ${form.cons.includes(c) ? 'bg-[#6A1E55]/40 border-[#A64D79]' : 'bg-black/30 border-white/20 hover:bg-[#6A1E55]/20'}`}>
                        <input type="checkbox" name="cons" value={c} checked={form.cons.includes(c)} onChange={handleChange} className="hidden"/>
                        <span className="block">{c}</span>
                      </label>
                    ))}
                  </div>
                  {errors.cons && <p className="text-rose-400 text-xs sm:text-sm mt-1">{errors.cons}</p>}
                </div>
              </div>
            )}

            {/* Step 5 */}
            {step === 5 && (
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <label className="block font-semibold text-[#A64D79] mb-3 sm:mb-4 text-sm sm:text-base">
                    Gut Feeling: <span className="text-white font-bold text-lg sm:text-xl">{form.gutFeeling}</span>
                  </label>
                  <div className="relative">
                    <input 
                      type="range" 
                      min="1" 
                      max="10" 
                      name="gutFeeling" 
                      value={form.gutFeeling} 
                      onChange={handleChange} 
                      className="w-full h-3 sm:h-4 rounded-lg appearance-none bg-black/30 cursor-pointer
                        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 sm:[&::-webkit-slider-thumb]:w-6 sm:[&::-webkit-slider-thumb]:h-6
                        [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-[#6A1E55] [&::-webkit-slider-thumb]:to-[#A64D79]
                        [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg
                        [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 sm:[&::-moz-range-thumb]:w-6 sm:[&::-moz-range-thumb]:h-6
                        [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-gradient-to-r [&::-moz-range-thumb]:from-[#6A1E55] [&::-moz-range-thumb]:to-[#A64D79]
                        [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:shadow-lg"
                    />
                    <div className="flex justify-between text-xs sm:text-sm text-white/60 mt-1">
                      <span>1</span>
                      <span className="hidden sm:inline">5</span>
                      <span>10</span>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block font-semibold text-[#A64D79] mb-3 sm:mb-4 text-sm sm:text-base">
                    Alignment: <span className="text-white font-bold text-lg sm:text-xl">{form.alignment}</span>
                  </label>
                  <div className="relative">
                    <input 
                      type="range" 
                      min="1" 
                      max="10" 
                      name="alignment" 
                      value={form.alignment} 
                      onChange={handleChange} 
                      className="w-full h-3 sm:h-4 rounded-lg appearance-none bg-black/30 cursor-pointer
                        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 sm:[&::-webkit-slider-thumb]:w-6 sm:[&::-webkit-slider-thumb]:h-6
                        [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-[#6A1E55] [&::-webkit-slider-thumb]:to-[#A64D79]
                        [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg
                        [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 sm:[&::-moz-range-thumb]:w-6 sm:[&::-moz-range-thumb]:h-6
                        [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-gradient-to-r [&::-moz-range-thumb]:from-[#6A1E55] [&::-moz-range-thumb]:to-[#A64D79]
                        [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:shadow-lg"
                    />
                    <div className="flex justify-between text-xs sm:text-sm text-white/60 mt-1">
                      <span>1</span>
                      <span className="hidden sm:inline">5</span>
                      <span>10</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 6 */}
            {step === 6 && (
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block font-semibold text-[#A64D79] mb-2 text-sm sm:text-base">Risk Level</label>
                  <select 
                    name="risk" 
                    value={form.risk} 
                    onChange={handleChange} 
                    className="w-full p-3 sm:p-4 rounded-xl bg-black/30 border border-white/20 text-white backdrop-blur-sm text-sm sm:text-base focus:ring-2 focus:ring-[#A64D79] focus:border-transparent transition-all"
                  >
                    <option value="">Select Risk</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                  {errors.risk && <p className="text-rose-400 text-xs sm:text-sm mt-1">{errors.risk}</p>}
                </div>

                <div>
                  <label className="block font-semibold text-[#A64D79] mb-2 text-sm sm:text-base">Future Aspirations</label>
                  <textarea 
                    name="futureAspirations" 
                    value={form.futureAspirations} 
                    onChange={handleChange} 
                    placeholder="> future_aspirations.log()" 
                    rows={3}
                    className="w-full p-3 sm:p-4 rounded-xl bg-black/30 border border-white/20 text-white backdrop-blur-sm text-sm sm:text-base resize-none focus:ring-2 focus:ring-[#A64D79] focus:border-transparent transition-all"
                  />
                  {errors.futureAspirations && <p className="text-rose-400 text-xs sm:text-sm mt-1">{errors.futureAspirations}</p>}
                </div>

                <div>
                  <label className="block font-semibold text-[#A64D79] mb-2 text-sm sm:text-base">Impact of Success</label>
                  <textarea 
                    name="impactSuccess" 
                    value={form.impactSuccess} 
                    onChange={handleChange} 
                    placeholder="> impact_success.log()" 
                    rows={3}
                    className="w-full p-3 sm:p-4 rounded-xl bg-black/30 border border-white/20 text-white backdrop-blur-sm text-sm sm:text-base resize-none focus:ring-2 focus:ring-[#A64D79] focus:border-transparent transition-all"
                  />
                  {errors.impactSuccess && <p className="text-rose-400 text-xs sm:text-sm mt-1">{errors.impactSuccess}</p>}
                </div>

                <div>
                  <label className="block font-semibold text-[#A64D79] mb-2 text-sm sm:text-base">Impact of Failure</label>
                  <textarea 
                    name="impactFailure" 
                    value={form.impactFailure} 
                    onChange={handleChange} 
                    placeholder="> impact_failure.log()" 
                    rows={3}
                    className="w-full p-3 sm:p-4 rounded-xl bg-black/30 border border-white/20 text-white backdrop-blur-sm text-sm sm:text-base resize-none focus:ring-2 focus:ring-[#A64D79] focus:border-transparent transition-all"
                  />
                  {errors.impactFailure && <p className="text-rose-400 text-xs sm:text-sm mt-1">{errors.impactFailure}</p>}
                </div>
              </div>
            )}

            {/* Navigation - Fully responsive */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 mt-6 sm:mt-8 pt-4 border-t border-white/10">
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
                {step > 1 ? (
                  <button 
                    type="button" 
                    onClick={handlePrev} 
                    className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-[#3B1C32]/50 border border-white/20 hover:bg-[#6A1E55]/40 transition text-sm sm:text-base order-2 sm:order-1"
                  >
                    ← Previous
                  </button>
                ) : <div className="hidden sm:block" />}
                
                <button 
                  type="button" 
                  onClick={fillTestData} 
                  className="w-full sm:w-auto text-xs sm:text-sm underline text-[#A64D79] hover:text-white transition order-3 sm:order-2"
                >
                  Fill test data
                </button>
              </div>

              {step < 6 ? (
                <button 
                  type="button" 
                  onClick={handleNext} 
                  className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-[#6A1E55] to-[#A64D79] hover:opacity-90 transition font-semibold text-sm sm:text-base order-1 sm:order-3"
                >
                  Next →
                </button>
              ) : (
                <button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:opacity-90 transition font-semibold disabled:opacity-50 text-sm sm:text-base order-1 sm:order-3"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit 🚀'}
                </button>
              )}
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}