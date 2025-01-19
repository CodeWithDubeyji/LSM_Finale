import React, { useState } from 'react'

const astrologyHouses = [
  {
    id: 1,
    name: 'House 1: House of self',
    description:
      'The first house is often called the house of self. It is ruled by Aries and the planet Mars, and the placements in this house can give you a window into understanding more about your outward appearance, traits, characteristics, outlook, and sense of expression. In other words, this house tells you a lot about your personality—not only the “visible aspects of your character” that make you who you are right now, but also clues to the ways your personality may evolve in the future.',
    image: 'https://pixlr.com/images/index/ai-image-generator-one.webp'
  },
  {
    id: 2,
    name: 'House 2: House of value and possessions',
    description:
      'The second house, ruled by Taurus and the planet Venus, relates to your possessions, but it’s not only focused on tangible things. Placements in this house can help you gain insight into all that belongs to you, be it your money, investments, and material environment or your inner self, needs, wants, and abilities. Value in the name of this house refers to both your finances and your internal values.',
    image: 'https://pixlr.com/images/index/ai-image-generator-one.webp'
  },
  {
    id: 3,
    name: 'House 3: House of communication',
    description:
      'The third house is called the House of Communication. Some astrologers may also refer to it as the House of Sharing. Ruled by Gemini and the planet Mercury, this house governs how you communicate and connect with others. Communication isn’t just talking or texting. It means “something imparted, interchanged, or transmitted.” For that reason, astrologers look to this house for more on someone’s written and verbal communication styles and how they might interact with themselves, their environment, and those they know well.',
    image: 'https://pixlr.com/images/index/ai-image-generator-one.webp'
  },
  {
    id: 4,
    name: 'House 4: House of family and home',
    description:
      'Ruled by Cancer and the Moon, the fourth house focuses on family, history, traditions, and ancestry. In other words, it tells us about home, or “the place in which one’s domestic affairs are centered.” This house sits at the “bottom” of the astrological wheel and is thought of by many astrologers as being foundational to a person’s self, life, and beliefs. You might look to this house for insight on how you relate to your parents or your own children and how you nurture yourself and others.',
    image: 'https://pixlr.com/images/index/ai-image-generator-one.webp'
  },
  {
    id: 5,
    name: 'House 5: House of pleasure',
    description:
      'Leos are known for being charismatic, outgoing, and dynamic, so it makes sense that the fifth house, ruled by the Sun and Leo, governs all things related to expression and creativity. Pleasure in this house’s name refers to “enjoyment or satisfaction derived from what is to one’s liking.” The fifth house tells you about things that create joy and fulfillment in your life, like art and culture, romance, games and hobbies, and even your family and children.',
    image: 'https://pixlr.com/images/index/ai-image-generator-one.webp'
  },
  {
    id: 6,
    name: 'House 6: House of health',
    description:
      'Pragmatic Virgo joins Mercury in ruling the sixth house. This house deals with health, or “the general condition of the body and mind,” on all levels. That means it can give you insight into not just your physical health and relationship with your body, but also your mental and emotional self, such as how you react to adversity and areas where you may experience personal growth. You may also look to this house to learn about your ideal career and ways to be of service to others.',
    image: 'https://pixlr.com/images/index/ai-image-generator-one.webp'
  },
  {
    id: 7,
    name: 'House 7: House of partnerships',
    description:
      'In the seventh through 12th houses, your birth chart shifts away from personal insights and begins to focus on the interpersonal, or how you interact with others. For that reason, the seventh house, ruled by Venus and Libra, is all about partnership. This doesn’t only mean romantic partnership. The astrological placements in this house are believed to govern your interactions in business relationships, contracts, and negotiations as well. Other names for this house are the House of Relationships and the House of Balance.',
    image: 'https://pixlr.com/images/index/ai-image-generator-one.webp'
  },
  {
    id: 8,
    name: 'House 8: House of transformation',
    description:
      'Passionate and mysterious Scorpio leads the eighth house with Mars and Pluto. This house also focuses on relationships, but it’s less on how people behave in relationships and more about how those relationships transform them. This includes insight into one’s birth, death, sexuality, and karma. This house also governs joint property that has transformational abilities, like inheritances, debt and even joint finances.',
    image: 'https://pixlr.com/images/index/ai-image-generator-one.webp'
  },
  {
    id: 9,
    name: 'House 9: House of purpose',
    description:
      'Ruled by Jupiter and Sagittarius, the House of Purpose is also sometimes called the House of Philosophy. That’s because it centers on the higher mind and philosophy, or “the rational investigation of the truths and principles of being, knowledge, or conducts.” This house focuses on our religion, morals, ethics, and dreams. Insights gained by studying the placements in this house may also relate to travel, culture, and even our ancestors, as these are all things with potential to contribute to our personal growth and search for meaning.',
    image: 'https://pixlr.com/images/index/ai-image-generator-one.webp'
  },
  {
    id: 10,
    name: 'House 10: House of social status',
    description:
      'Capricorn is among the hardest working signs in the zodiac, and that’s why the 10th house, ruled by Saturn and Capricorn, is where you look to learn more about your career, achievements, and your social status, or how you “relate to, [are] devoted to, or characterized by friendly companionship or relations.” The cusp, or border, of the 10th house is known as the midheaven, and it can tell astrologers more about your career path. Placements in this house can also help you determine professional goals and ambitions, as well as how successful you may be. Some astrologers think of this as the “fame” house, as celebrities often have several placements in this house.',
    image: 'https://pixlr.com/images/index/ai-image-generator-one.webp'
  },
  {
    id: 11,
    name: 'House 11: House of friendships',
    description:
      'The 11th house, ruled by Saturn, Uranus, and Aquarius, deals with the ways in which our friendships and how we find harmony with others. Astrological placements in this house can tell you more about the clubs, social groups, and organizations to which you are drawn. This house is all about collective beliefs and actions, and how those contribute to self-actualization, or “the achievement of one’s full potential through creativity, independence, spontaneity, and a grasp of the real world.”',
    image: 'https://pixlr.com/images/index/ai-image-generator-one.webp'
  },
  {
    id: 12,
    name: 'House 12: House of subconscious',
    description:
      'The 12th house, also sometimes called the House of Unconscious, is ruled by Pisces and the planets Jupiter and Neptune. Pisces is associated with emotions and creativity; therefore, you can look to this house to learn more about your imagination, feelings, and subconscious mind, which “exists or operates beneath or beyond consciousness.” Placements in the 12th house indicate private strengths and weaknesses and how people confront and learn from their past actions. Some astrologers also believe you can look here to find clues about old age and the afterlife.',
    image: 'https://pixlr.com/images/index/ai-image-generator-one.webp'
  }
]

const AstrologyHouses = () => {
  const [selectedHouse, setSelectedHouse] = useState(astrologyHouses[0])

  return (
    <div className='w-full text-white mx-auto border-2 border-neutral-100 flex flex-wrap items-start justify-between gap-4 p-4 rounded-lg'>
      {/* Content Section */}
      <div className='w-[48%] p-4'>
        <h2 className='text-3xl font-bold mb-4'>{selectedHouse.name}</h2>
        <p className='text-lg'>{selectedHouse.description}</p>
      </div>

      {/* Houses Section */}
      <div className='w-[48%] grid grid-cols-4 gap-4'>
        {astrologyHouses.map(house => (
          <div
            key={house.id}
            className='relative p-2 cursor-pointer hover:scale-105 hover:shadow-lg transition transform'
            onClick={() => setSelectedHouse(house)}
            title={house.name}
          >
            <div className='overflow-hidden rounded-full aspect-square'>
              <img
                src={house.image}
                alt={house.name}
                className='w-full h-full object-cover'
              />
            </div>
            <p className='text-center mt-2 font-medium text-sm'>{house.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AstrologyHouses
