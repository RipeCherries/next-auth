import { Html, Head, Preview, Body, Container, Heading, Text, Button } from '@react-email/components';

interface VerifyEmailProps {
  name: string;
  verifyLink: string;
}

export function VerifyEmail({ name, verifyLink }: VerifyEmailProps) {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
              rel="stylesheet" />
      </Head>
      <Preview>Verify your email address</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <img
            src="https://em-content.zobj.net/source/apple/391/locked-with-key_1f510.png"
            alt="Next Auth Logo"
            style={styles.logo}
          />
          <Heading style={styles.heading}>Next Auth App</Heading>
          <Text style={styles.text}>Hi, <b>{name}</b>!</Text>
          <Text style={styles.text}>
            Welcome to <b>Next Auth App</b>, a test application that implements authorization. Click on the button below
            to confirm your email.
          </Text>
          <Button
            href={verifyLink}
            style={styles.button}
          >
            Verify Email
          </Button>
        </Container>
      </Body>
    </Html>
  );
}

VerifyEmail.PreviewProps = {
  name: 'Alexey',
  verifyLink: 'https://react.email'
} as VerifyEmailProps;

const styles = {
  body: {
    backgroundColor: '#E8E8E8',
    fontFamily: '"Montserrat", sans-serif',
    padding: '20px'
  },
  container: {
    margin: '0 auto',
    backgroundColor: '#FFFFFF',
    borderRadius: '16px',
    padding: '20px'
  },
  logo: {
    display: 'block',
    margin: '0 auto',
    width: '100px'
  },
  heading: {
    textAlign: 'center' as const,
    fontSize: '28px',
    marginBottom: '20px'
  },
  text: {
    fontSize: '18px',
    margin: '10px 0',
    textAlign: 'justify' as const
  },
  button: {
    display: 'block',
    margin: '20px auto 0',
    padding: '20px',
    fontSize: '18px',
    fontWeight: '500',
    textAlign: 'center' as const,
    color: '#FFFFFF',
    backgroundColor: '#0F172A',
    borderRadius: '8px',
    cursor: 'pointer'
  }
};

export default VerifyEmail;
