import React, { useState } from 'react'

const Kundli = () => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    birthDate: '',
    birthTime: '',
    birthPlace: '',
    lat: '19.2361',
    lon: '72.9488',
    tzone: '5.5',
    varshaphal_year: '2025',
    planetName: '',
    planetId: '',
    chartId: ''
  })

  const [selectedOption, setSelectedOption] = useState('Janam Kundli')
  const [insights, setInsights] = useState('')
  const [doshas, setDoshas] = useState('')
  const [remedies, setRemedies] = useState('')
  const [horoscope, setHoroscope] = useState('')
  const [response, setResponse] = useState(null)

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  // Submit form handler
  const handleSubmit = async e => {
    e.preventDefault()
    const [year, month, day] = formData.birthDate.split('-')
    const [hour, min] = formData.birthTime.split(':')

    const payload = {
      Day: parseInt(day),
      Month: parseInt(month),
      Year: parseInt(year),
      Hour: parseInt(hour),
      Min: parseInt(min),
      Lat: formData.lat,
      Lon: formData.lon,
      Tzone: formData.tzone,
      City: formData.birthPlace,
      Varshaphal_year: formData.varshaphal_year,
      PlanetName: formData.planetName,
      PlanetId: formData.planetId,
      ChartId: formData.chartId
    }

    try {
      const res = await fetch(
        'https://teaching-immortal-honeybee.ngrok-free.app/enteruserdata',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        }
      )
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)

      const result = await res.json()
      const getRes = await fetch(
        'https://teaching-immortal-honeybee.ngrok-free.app/astro_kundli_details',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true'
          }
        }
      )
      if (!getRes.ok)
        throw new Error(`HTTP error on GET request! status: ${getRes.status}`)
      const getResult = await getRes.json()
      setResponse(getResult)
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  // Handle Janam Kundli
  const handleJanamKundli = async () => {
    setSelectedOption('Janam Kundli')
    setOptionData(null) // Reset OptionData for Janam Kundli
  }

  // Handle Insights
  const handleInsights = async () => {
    setSelectedOption('Insights')
    try {
      const res = await fetch(
        'https://teaching-immortal-honeybee.ngrok-free.app/daily_kundli_nakshatra',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true'
          }
        }
      )
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`)
      const data = await res.json()
      setInsights(data)
    } catch (error) {
      console.error('Error fetching Insights data:', error)
      setOptionData({
        error: 'Failed to fetch data for Insights. Please try again.'
      })
    }
  }

  // Handle Doshas
  const handleDoshas = async () => {
    setSelectedOption('Doshas')
    try {
      const res = await fetch(
        'https://teaching-immortal-honeybee.ngrok-free.app/dosh_report',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true'
          }
        }
      )
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`)
      const data = await res.json()
      setDoshas(data)
    } catch (error) {
      console.error('Error fetching Doshas data:', error)
      setOptionData({
        error: 'Failed to fetch data for Doshas. Please try again.'
      })
    }
  }

  const handleRemedies = async () => {
    setSelectedOption('Remedies')
    try {
      const res = await fetch(
        'https://teaching-immortal-honeybee.ngrok-free.app/remedies',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true'
          }
        }
      )
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`)
      const data = await res.json()
      setRemedies(data)
      console.log(data)
    } catch (error) {
      console.error('Error fetching Doshas data:', error)
      setOptionData({
        error: 'Failed to fetch data for Doshas. Please try again.'
      })
    }
  }

  return (
    <div className='bg-[#000622] min-h-screen px-16 pt-20'>
      <div className='flex justify-between items-center'>
        {/* Form Section */}
        <div className='w-full md:w-2/3 lg:w-1/2 mx-auto'>
          <form
            onSubmit={handleSubmit}
            className='backdrop-blur-lg bg-white bg-opacity-20 p-6 rounded-lg shadow-lg'
            style={{ maxWidth: '500px' }}
          >
            <h2 className='text-2xl font-semibold text-white mb-6 text-center'>
              Enter Your Details
            </h2>

            {/* Name */}
            <div className='mb-4'>
              <label
                htmlFor='name'
                className='block text-white text-sm font-medium mb-2'
              >
                Name:
              </label>
              <input
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                required
                className='w-full p-3 rounded-lg bg-white bg-opacity-10 text-black border border-transparent focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400'
              />
            </div>

            {/* Gender */}
            <div className='mb-4'>
              <label
                htmlFor='gender'
                className='block text-white text-sm font-medium mb-2'
              >
                Gender:
              </label>
              <select
                id='gender'
                name='gender'
                value={formData.gender}
                onChange={handleChange}
                required
                className='w-full p-3 rounded-lg bg-white bg-opacity-10 text-black border border-transparent focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400'
              >
                <option value=''>Select Gender</option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
                <option value='other'>Other</option>
              </select>
            </div>

            {/* Birth Date */}
            <div className='mb-4'>
              <label
                htmlFor='birthDate'
                className='block text-white text-sm font-medium mb-2'
              >
                Birth Date:
              </label>
              <input
                type='date'
                id='birthDate'
                name='birthDate'
                value={formData.birthDate}
                onChange={handleChange}
                required
                className='w-full p-3 rounded-lg bg-white bg-opacity-10 text-black border border-transparent focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400'
              />
            </div>

            {/* Birth Time */}
            <div className='mb-4'>
              <label
                htmlFor='birthTime'
                className='block text-white text-sm font-medium mb-2'
              >
                Birth Time:
              </label>
              <input
                type='time'
                id='birthTime'
                name='birthTime'
                value={formData.birthTime}
                onChange={handleChange}
                required
                className='w-full p-3 rounded-lg bg-white bg-opacity-10 text-black border border-transparent focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400'
              />
            </div>

            {/* Birth Place */}
            <div className='mb-4'>
              <label
                htmlFor='birthPlace'
                className='block text-white text-sm font-medium mb-2'
              >
                Birth Place:
              </label>
              <input
                type='text'
                id='birthPlace'
                name='birthPlace'
                value={formData.birthPlace}
                onChange={handleChange}
                required
                className='w-full p-3 rounded-lg bg-white bg-opacity-10 text-black border border-transparent focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400'
              />
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              className='w-full mt-4 p-3 bg-teal-500 text-white font-medium text-lg rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400'
            >
              Submit
            </button>
          </form>
        </div>

        {/* Options and Option Data Section */}
        <div className='w-1/2 h-[85vh] text-white overflow-scroll scrollbar-hide'>
          {response?.resObj1 && (
            <div className='flex flex-col gap-4 justify-start'>
              <div className='bg-white bg-opacity-10 p-8 rounded-lg shadow-lg'>
                <h1 className='text-3xl font-semibold text-white mb-6'>
                  Your Details
                </h1>

                <div className='flex flex-col gap-4'>
                  <div className='bg-white bg-opacity-20 p-4 rounded-lg'>
                    <p className='text-lg font-medium text-white'>
                      <span className='font-bold text-teal-400'>
                        Nakshatra:
                      </span>{' '}
                      {response.resObj1.nakshatra.item2}
                    </p>
                  </div>

                  <div className='bg-white bg-opacity-20 p-4 rounded-lg'>
                    <p className='text-lg font-medium text-white'>
                      <span className='font-bold text-teal-400'>
                        Ascendants:
                      </span>{' '}
                      {response.resObj1.ascendant.item2}
                    </p>
                  </div>

                  <div className='bg-white bg-opacity-20 p-4 rounded-lg'>
                    <p className='text-lg font-medium text-white'>
                      <span className='font-bold text-teal-400'>Sign:</span>{' '}
                      {response.resObj1.sign.item2.split('zodiac')[1]}
                    </p>
                  </div>
                </div>
              </div>

              {/* Option Selection Buttons */}
              <div className='bg-white bg-opacity-10 p-8 rounded-lg'>
                <div className='flex justify-between items-center gap-x-4'>
                  <div
                    onClick={handleJanamKundli}
                    className={`bg-white bg-opacity-20 p-2 rounded-full flex-1 text-center cursor-pointer hover:bg-gray-500 ${
                      selectedOption === 'Janam Kundli' ? 'bg-gray-600' : ''
                    }`}
                  >
                    Janam Kundli
                  </div>
                  <div
                    onClick={handleInsights}
                    className={`bg-white bg-opacity-20 p-2 rounded-full flex-1 text-center cursor-pointer hover:bg-gray-500 ${
                      selectedOption === 'Insights' ? 'bg-gray-600' : ''
                    }`}
                  >
                    Insights
                  </div>
                  <div
                    onClick={handleDoshas}
                    className={`bg-white bg-opacity-20 p-2 rounded-full flex-1 text-center cursor-pointer hover:bg-gray-500 ${
                      selectedOption === 'Doshas' ? 'bg-gray-600' : ''
                    }`}
                  >
                    Doshas
                  </div>
                  <div
                    onClick={handleRemedies}
                    className={`bg-white bg-opacity-20 p-2 rounded-full flex-1 text-center cursor-pointer hover:bg-gray-500 ${
                      selectedOption === 'Remedies' ? 'bg-gray-600' : ''
                    }`}
                  >
                    Remedies
                  </div>
                </div>
              </div>

              {/* Render data based on selected option */}
              {selectedOption === 'Janam Kundli' && response?.data && (
                <div className='bg-white bg-opacity-10 p-8 rounded-lg'>
                  <h2 className='text-xl font-medium leading-relaxed mb-3'>
                    {selectedOption}
                  </h2>
                  <table className='table-auto w-full text-white'>
                    <tbody>
                      {Object.entries(response.data)
                        .reduce((rows, [key, value], index, array) => {
                          if (index % 2 === 0) {
                            rows.push(array.slice(index, index + 2))
                          }
                          return rows
                        }, [])
                        .map((pair, rowIndex) => (
                          <tr key={rowIndex}>
                            {pair.map(([key, value]) => (
                              <td
                                key={key}
                                className='border border-white px-4 py-2 w-1/2'
                              >
                                <strong>{value.item1}:</strong> {value.item2}
                              </td>
                            ))}
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Render Insights, Doshas, and other options data */}
              {selectedOption === 'Insights' && insights?.data?.prediction && (
                <div className='bg-white bg-opacity-10 p-8 rounded-lg shadow-xl'>
                  <h2 className='text-2xl font-semibold text-white mb-8 text-center'>
                    {selectedOption}
                  </h2>
                  {Object.entries(insights.data.prediction).map(
                    ([key, value], index) => (
                      <div
                        key={index}
                        className='mb-6 p-6 bg-white bg-opacity-15 rounded-lg shadow-lg hover:bg-opacity-20 transition duration-300'
                      >
                        <h3 className='text-xl font-medium text-white capitalize mb-3'>
                          {key.replace('_', ' ')}
                        </h3>
                        <p className='text-white text-sm'>{value}</p>
                      </div>
                    )
                  )}
                </div>
              )}

              {selectedOption === 'Doshas' && doshas && (
                <div className='bg-white bg-opacity-10 p-8 rounded-lg shadow-lg'>
                  <h2 className='text-2xl font-semibold text-white mb-4'>
                    {selectedOption}
                  </h2>
                  {doshas.error ? (
                    <p className='text-red-500'>{doshas.error}</p>
                  ) : (
                    <div className='flex flex-col gap-6'>
                      <div className='bg-white bg-opacity-20 p-4 rounded-lg shadow-sm'>
                        <h3 className='text-lg font-medium text-white mb-2'>
                          Pitra Dosha
                        </h3>
                        <p className='text-white'>
                          <strong>Present:</strong>{' '}
                          {doshas[0].data.is_pitri_dosha_present
                            ? 'True'
                            : 'False'}
                        </p>
                        <p className='text-white'>
                          <strong>Conclusion:</strong>{' '}
                          {doshas[0].data.conclusion}
                        </p>
                        <p className='text-white'>
                          <strong>Effects:</strong>{' '}
                          {doshas[0].data.effects || 'No effect'}
                        </p>
                      </div>

                      <div className='bg-white bg-opacity-20 p-4 rounded-lg shadow-sm'>
                        <h3 className='text-lg font-medium text-white mb-2'>
                          Sadhesati Dosha
                        </h3>
                        <p className='text-white'>
                          <strong>Present:</strong>{' '}
                          {doshas[1].data.sadhesati_status ? 'True' : 'False'}
                        </p>
                        <p className='text-white'>
                          <strong>Conclusion:</strong>{' '}
                          {doshas[1].data.is_undergoing_sadhesati}
                        </p>
                      </div>

                      <div className='bg-white bg-opacity-20 p-4 rounded-lg shadow-sm'>
                        <h3 className='text-lg font-medium text-white mb-2'>
                          Kalsarpa Dosha
                        </h3>
                        <p className='text-white'>
                          <strong>Present:</strong>{' '}
                          {doshas[2].data.present ? 'True' : 'False'}
                        </p>
                        <p className='text-white'>
                          <strong>Conclusion:</strong> {doshas[2].data.one_line}
                        </p>
                      </div>

                      <div className='bg-white bg-opacity-20 p-4 rounded-lg shadow-sm'>
                        <h3 className='text-lg font-medium text-white mb-2'>
                          Manglik Dosha
                        </h3>
                        <p className='text-white'>
                          <strong>Present:</strong>{' '}
                          {doshas[3].data.manglik_status}
                        </p>
                        <p className='text-white'>
                          <strong>Conclusion:</strong>{' '}
                          {doshas[3].data.manglik_report}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {selectedOption === 'Remedies' && remedies && (
                <div className='bg-white bg-opacity-10 p-8 rounded-lg'>
                  <h2 className='text-xl font-medium leading-relaxed mb-3'>
                    {selectedOption}
                  </h2>
                  {remedies.error ? (
                    <p className='text-red-500'>{remedies.error}</p>
                  ) : (
                    <div className='flex flex-col gap-4'>
                      <div className='bg-white bg-opacity-20 p-6 rounded-lg shadow-lg hover:bg-opacity-30 transition duration-300'>
                        <h3 className='text-xl font-semibold text-white mb-4'>
                          Remedies
                        </h3>
                        <p className='text-white'>
                          {remedies[0].data.remedies.map((remedy, index) => (
                            <span key={index} className='block mb-2'>
                              {remedy.split('.').map((part, idx) => (
                                <span key={idx} className='block'>
                                  {part}
                                  {idx < remedy.split('.').length - 1 && <br />}
                                </span>
                              ))}
                            </span>
                          ))}
                        </p>
                      </div>

                      <div className='bg-white bg-opacity-20 p-6 rounded-lg shadow-lg hover:bg-opacity-30 transition duration-300'>
                        <h3 className='text-xl font-semibold text-white mb-4'>
                          Gemstones
                        </h3>
                        <div className='space-y-6'>
                          {/* Benefics Section */}
                          <div className='bg-white bg-opacity-10 p-4 rounded-lg hover:bg-opacity-20 transition duration-300'>
                            <h4 className='text-lg font-medium text-white mb-2'>
                              Benefics
                            </h4>
                            <p className='text-white'>
                              <strong>Name:</strong>{' '}
                              {remedies[2].data.benefic.name}
                            </p>
                            <p className='text-white'>
                              <strong>Deity:</strong>{' '}
                              {remedies[2].data.benefic.gem_deity}
                            </p>
                          </div>

                          {/* Life Section */}
                          <div className='bg-white bg-opacity-10 p-4 rounded-lg hover:bg-opacity-20 transition duration-300'>
                            <h4 className='text-lg font-medium text-white mb-2'>
                              Life
                            </h4>
                            <p className='text-white'>
                              <strong>Name:</strong>{' '}
                              {remedies[2].data.life.name}
                            </p>
                            <p className='text-white'>
                              <strong>Deity:</strong>{' '}
                              {remedies[2].data.life.gem_deity}
                            </p>
                          </div>

                          {/* Lucky Section */}
                          <div className='bg-white bg-opacity-10 p-4 rounded-lg hover:bg-opacity-20 transition duration-300'>
                            <h4 className='text-lg font-medium text-white mb-2'>
                              Lucky
                            </h4>
                            <p className='text-white'>
                              <strong>Name:</strong>{' '}
                              {remedies[2].data.lucky.name}
                            </p>
                            <p className='text-white'>
                              <strong>Deity:</strong>{' '}
                              {remedies[2].data.lucky.gem_deity}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Kundli
