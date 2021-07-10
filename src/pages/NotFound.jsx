import { Helmet } from 'react-helmet-async'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: ${({ theme }) => theme.textColor};
  background-color: ${({ theme }) => theme.secondary};
`

const Title = styled.h1`
  margin-bottom: 2rem;
  font-weight: 400;
  font-size: 6.2rem;
  color: ${({ theme }) => theme.textColor};
`

const Subtitle = styled.p`
  margin-bottom: 1rem;
  font-weight: 200;
  font-size: 2.4rem;
`

const StyledLink = styled.button`
  margin-bottom: 1rem;
  border: none;
  font-weight: 200;
  font-size: 2.3rem;
  text-decoration: underline;
  color: ${({ theme }) => theme.textColor};
  background: none;
  cursor: pointer;
  text-decoration-thickness: 2px;
  text-underline-offset: 2px;
`

const NotFound = () => {
  const history = useHistory()

  return (
    <Container>
      <Helmet>
        <title>Page Not Found</title>
        <meta
          name="description"
          content="The page you were searching for does not exist"
        />
      </Helmet>

      <Title>404 Not Found</Title>
      <Subtitle>The link you requested does not exist.</Subtitle>
      <StyledLink onClick={history.goBack}>Go back</StyledLink>
    </Container>
  )
}

export default NotFound
