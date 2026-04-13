export default function SkipNavigation({mainContent}) {
  return (
    <a href={`#${mainContent}`} className="skip-link sr-only" tabIndex={1}>
        Pular para conteúdo
    </a>
  )
}