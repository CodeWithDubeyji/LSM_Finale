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
  const [optionData, setOptionData] = useState('')
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
      setOptionData(data)
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
      setOptionData(data)
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
      setOptionData(data)
      console.log(data)
    } catch (error) {
      console.error('Error fetching Doshas data:', error)
      setOptionData({
        error: 'Failed to fetch data for Doshas. Please try again.'
      })
    }
  }

  const handleHoroscope = async () => {
    setSelectedOption('Horoscope')
    // Call API for Horoscope and handle the response
  }

  return (
    <div className='bg-[#000622] min-h-screen px-16 pt-20'>
      <div className='flex justify-between items-center'>
        {/* Form Section */}
        <div className='w-1/2'>
          <form
            onSubmit={handleSubmit}
            style={{ maxWidth: '400px' }}
            className='backdrop-blur-lg bg-white bg-opacity-10 p-8 rounded-lg '
          >
            <div style={{ marginBottom: '1rem' }}>
              <label
                htmlFor='name'
                style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: 'white'
                }}
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
                style={{ width: '100%', padding: '0.5rem' }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label
                htmlFor='gender'
                style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: 'white'
                }}
              >
                Gender:
              </label>
              <select
                id='gender'
                name='gender'
                value={formData.gender}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '0.5rem' }}
              >
                <option value=''>Select Gender</option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
                <option value='other'>Other</option>
              </select>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label
                htmlFor='birthDate'
                style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: 'white'
                }}
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
                style={{ width: '100%', padding: '0.5rem' }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label
                htmlFor='birthTime'
                style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: 'white'
                }}
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
                style={{ width: '100%', padding: '0.5rem' }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label
                htmlFor='birthPlace'
                style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: 'white'
                }}
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
                style={{ width: '100%', padding: '0.5rem' }}
              />
            </div>
            <button
              type='submit'
              style={{
                padding: '0.75rem',
                background: '#4CAF50',
                color: 'white',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Submit
            </button>
          </form>
        </div>

        {/* Options and Option Data Section */}
        <div className='w-1/2 h-[85vh] text-white overflow-scroll scrollbar-hide'>
          {response?.resObj1 && (
            <div className='flex flex-col gap-4 justify-start'>
              <div className='bg-white bg-opacity-10 p-8 rounded-lg'>
                <h1>Your Details</h1>
                <p>Nakshatra: {response.resObj1.nakshatra.item2}</p>
                <p>Ascendants: {response.resObj1.ascendant.item2}</p>
                <p>Sign: {response.resObj1.sign.item2.split('zodiac')[1]}</p>
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
                  <div
                    onClick={handleHoroscope}
                    className={`bg-white bg-opacity-20 p-2 rounded-full flex-1 text-center cursor-pointer hover:bg-gray-500 ${
                      selectedOption === 'Horoscope' ? 'bg-gray-600' : ''
                    }`}
                  >
                    Horoscope
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
              {selectedOption === 'Insights' && optionData?.data?.prediction && (
                <div className='bg-white bg-opacity-10 p-8 rounded-lg'>
                  <h2 className='text-xl font-medium leading-relaxed mb-3'>
                    {selectedOption}
                  </h2>
                  {Object.entries(optionData.data.prediction).map(
                    ([key, value], index) => (
                      <div key={index} className='mb-4'>
                        <h3 className='text-lg font-semibold capitalize text-white'>
                          {key.replace('_', ' ')}
                        </h3>
                        <p className='text-white'>{value}</p>
                      </div>
                    )
                  )}
                </div>
              )}

              {selectedOption === 'Doshas' && optionData && (
                <div className='bg-white bg-opacity-10 p-8 rounded-lg'>
                  <h2 className='text-xl font-medium leading-relaxed mb-3'>
                    {selectedOption}
                  </h2>
                  {optionData.error ? (
                    <p className='text-red-500'>{optionData.error}</p>
                  ) : (
                    <div className='flex flex-col gap-4'>
                      <div>
                        <h3 className='text-lg font-medium leading-relaxed my-2'>
                          Pitra Dosha
                        </h3>
                        <p>
                          Present:{' '}
                          {optionData[0].data.is_pitri_dosha_present
                            ? 'True'
                            : 'false'}
                        </p>
                        <p>Conclusion: {optionData[0].data.conclusion}</p>
                        <p>
                          Effects:{' '}
                          {optionData[0].data.effects
                            ? optionData[0].data.effects
                            : 'No effect'}
                        </p>
                      </div>
                      <div>
                        <h3 className='text-lg font-medium leading-relaxed my-2'>
                          Sadhesati Dosha
                        </h3>
                        <p>
                          Present:{' '}
                          {optionData[1].data.sadhesati_status
                            ? 'True'
                            : 'false'}
                        </p>
                        <p>
                          Conclusion:
                          {optionData[1].data.is_undergoing_sadhesati}
                        </p>
                      </div>
                      <div>
                        <h3 className='text-lg font-medium leading-relaxed my-2'>
                          Kalsarpa Dosha
                        </h3>
                        <p>
                          Present:{' '}
                          {optionData[2].data.present ? 'True' : 'false'}
                        </p>
                        <p>Conclusion: {optionData[2].data.one_line}</p>
                      </div>
                      <div>
                        <h3 className='text-lg font-medium leading-relaxed my-2'>
                          Manglik Dosha
                        </h3>
                        <p>Present: {optionData[3].data.manglik_status}</p>
                        <p>Conclusion: {optionData[3].data.manglik_report}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {selectedOption === 'Remedies' && optionData && (
                <div className='bg-white bg-opacity-10 p-8 rounded-lg'>
                  <h2 className='text-xl font-medium leading-relaxed mb-3'>
                    {selectedOption}
                  </h2>
                  {optionData.error ? (
                    <p className='text-red-500'>{optionData.error}</p>
                  ) : (
                    <div className='flex flex-col gap-4'>
                      <div>
                        <h3 className='text-lg font-medium leading-relaxed my-2'>
                          Remedies
                        </h3>
                        <p>
                          {optionData[0].data.remedies.map((remedy, index) => (
                            <span key={index}>{remedy}</span>
                          ))}
                        </p>
                      </div>
                      <div>
                        <h3 className='text-lg font-medium leading-relaxed my-2'>
                          Gemstones
                        </h3>
                        <p>
                          Present:{' '}
                          {optionData[1].data.sadhesati_status
                            ? 'True'
                            : 'false'}
                        </p>
                        <p>
                          Conclusion:
                          {optionData[1].data.is_undergoing_sadhesati}
                        </p>
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
