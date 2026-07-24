import AboutSection from '../sections/AboutSection.jsx'
import CareerSection from '../sections/CareerSection.jsx'
import GoalsSection from '../sections/GoalsSection.jsx'
import ProjectsSection from '../sections/ProjectsSection.jsx'
import SkillsSection from '../sections/SkillsSection.jsx'
import WelcomeSection from '../sections/WelcomeSection.jsx'

export default function PortfolioPage() {
  return (
    <>
      <WelcomeSection />
      <AboutSection />
      <SkillsSection />
      <CareerSection />
      <GoalsSection />
      <ProjectsSection />
    </>
  )
}