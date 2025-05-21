import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import Menu from "../components/Menu";

const supabase = createClient(
  'https://mwcdepjwazbsggzotkac.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13Y2RlcGp3YXpic2dnem90a2FjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3NzIyMTcsImV4cCI6MjA2MzM0ODIxN30.ftDUzWaSPn9l3bcpr6y8gPI9PLIaYXozYMMu6XwZDwE'
)

export default function UploadLinkPage() {
  const [formData, setFormData] = useState({
    subject: '',
    type: '',
    class: '',
    link: ''
  })

  const [subjects, setSubjects] = useState([])
  const [types, setTypes] = useState([])
  const [classes, setClasses] = useState([])
  const [status, setStatus] = useState('')

  // Fetch dropdown data
  useEffect(() => {
    const fetchDropdowns = async () => {
      const [subjectsRes, typesRes, classesRes] = await Promise.all([
        supabase.from('subjects').select('subject, name'),
        supabase.from('types').select('type, name'),
        supabase.from('classes').select('class, name')
      ])

      if (!subjectsRes.error) setSubjects(subjectsRes.data)
      else console.error('Error fetching subjects:', subjectsRes.error)

      if (!typesRes.error) setTypes(typesRes.data)
      else console.error('Error fetching types:', typesRes.error)

      if (!classesRes.error) setClasses(classesRes.data)
      else console.error('Error fetching classes:', classesRes.error)
    }

    fetchDropdowns()
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { error } = await supabase.from('links').insert([formData])
    if (error) {
      setStatus('שגיאה בהעלאת הקישור.')
      console.error(error)
    } else {
      setStatus('הקישור הועלה בהצלחה!')
      setFormData({ subject: '', type: '', class: '', link: '' ,name: ''})
    }
  }

  return (
    <div className="bg-white min-h-screen">
      <Menu />

      {/* Hero section with proper spacing */}
      <div className="relative isolate px-6 pt-24 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-300 to-blue-500 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          ></div>
        </div>

        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="bg-white min-h-screen px-4 pt-32" dir="rtl">
      <div className="max-w-6xl mx-auto bg-gray-50 shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">העלאת קישור חדש</h2>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col lg:flex-row gap-4">

            {/* Class Dropdown */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">כיתה</label>
              <select
                name="class"
                value={formData.class}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 text-right"
                required
              >
                <option value="">בחר כיתה</option>
                {classes.map((c) => (
                  <option key={c.class} value={c.class}>{c.name}</option>
                ))}
              </select>
            </div>
            
            {/* Subject Dropdown */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">מקצוע</label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 text-right"
                required
              >
                <option value="">בחר מקצוע</option>
                {subjects.map((s) => (
                  <option key={s.subject} value={s.subject}>{s.name}</option>
                ))}
              </select>
            </div>

            {/* Type Dropdown */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">סוג</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 text-right"
                required
              >
                <option value="">בחר סוג</option>
                {types.map((t) => (
                  <option key={t.type} value={t.type}>{t.name}</option>
                ))}
              </select>
            </div>

            {/* Link Input */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">כתובת הקישור (URL)</label>
              <input
                type="url"
                name="link"
                value={formData.link}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 text-right"
                required
              />
            </div>            
            
            {/* name Input */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">שם הקובץ 
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 text-right"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            שלח
          </button>
        </form>

        {status && (
          <p className="mt-4 text-center text-sm text-green-600">{status}</p>
        )}
      </div>
    </div>
        </div>

        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-blue-300 to-blue-500 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
