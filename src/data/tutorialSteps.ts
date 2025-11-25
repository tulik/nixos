import type { TutorialStep } from '../types';

export const tutorialIntro: TutorialStep = {
  id: 'intro',
  title: 'X.509 Certificates with OpenSSL',
  description: `
      Welcome to the guide on generating X.509 certificates manually using OpenSSL.
      Understanding how keys, Certificate Signing Requests (CSRs), and certificates work together is crucial for securing communications.
      
      We will walk through generating a private key, creating a CSR, and signing a certificate.

      Before you start
      - Audience: Developers and SysAdmins interested in PKI and security.
      - Prerequisites: Basic familiarity with the command line.
      - Goal: Create a self-signed certificate for a local device.
    `,
  concept: {
    title: 'Public Key Infrastructure',
    text: 'PKI relies on asymmetric cryptography: a private key (kept secret) and a public key (shared). The certificate binds the public key to an identity.',
    icon: 'ReliableIcon'
  }
};

export const tutorialSteps: TutorialStep[] = [
  {
    id: 'private-key',
    title: '1. Generate Private Key',
    description: `
      The first step is to generate a private key. This key must be kept secret.
      We will use RSA with a key length of 2048 bits.
    `,
    command: `
# Generate a 2048-bit RSA private key
openssl genrsa -out device.key 2048

# Check the generated key file
cat device.key
    `,
    concept: {
      title: 'Private Key',
      text: 'The private key is the mathematical foundation of your identity. If someone steals it, they can impersonate you. Never share it.',
      icon: 'ReliableIcon'
    }
  },
  {
    id: 'csr',
    title: '2. Create CSR',
    description: `
      Now we create a Certificate Signing Request (CSR). 
      This file contains your public key and information about your identity (Subject), but not your private key.
    `,
    command: `
# Create a CSR using the private key
# We specify the subject directly to avoid interactive prompts
openssl req -new -key device.key -out device.csr \\
  -subj "/C=US/ST=CA/L=San Francisco/O=MyCompany/CN=device.local"

# Inspect the CSR
openssl req -text -noout -verify -in device.csr
    `,
    concept: {
      title: 'CSR',
      text: 'A CSR is like a job application. You fill out your details and attach your public key, then send it to a Certificate Authority (CA) to get "hired" (signed).',
      icon: 'DeclarativeIcon'
    }
  },
  {
    id: 'sign',
    title: '3. Sign Certificate',
    description: `
      In a real scenario, you would send the CSR to a CA (like Verisign or Let's Encrypt).
      For this tutorial, we will act as our own CA and self-sign the certificate.
    `,
    command: `
# Sign the certificate using our own private key (Self-Signed)
# Valid for 365 days
openssl x509 -req -days 365 -in device.csr -signkey device.key -out device.crt

# Check the output file
ls -l device.crt
    `,
    concept: {
      title: 'Self-Signed',
      text: 'Self-signed certificates are great for testing but not trusted by browsers by default because no known CA vouched for them.',
      icon: 'ConfigIcon'
    }
  },
  {
    id: 'verify',
    title: '4. Verify Certificate',
    description: `
      Let's inspect the final certificate to ensure it contains the correct information.
    `,
    command: `
# Read the certificate text
openssl x509 -text -noout -in device.crt

# Verify the modulus matches the private key (advanced check)
openssl x509 -noout -modulus -in device.crt | openssl md5
openssl rsa -noout -modulus -in device.key | openssl md5
    `,
    concept: {
      title: 'Verification',
      text: 'X.509 certificates follow a standard format. You can always inspect them to see who issued them, who they are for, and when they expire.',
      icon: 'ReliableIcon'
    }
  },
  {
    id: 'cert-conf',
    title: '5. Create cert.conf',
    description: `
      We need to prepare a certificate configuration file.
      This defines specific settings for the certificate, including the required OID for Intel AMT.
    `,
    command: `
# Create cert.conf
cat > cert.conf <<EOF
basicConstraints = CA:FALSE
subjectKeyIdentifier = hash
authorityKeyIdentifier = keyid,issuer:always
keyUsage = digitalSignature, keyEncipherment
extendedKeyUsage = serverAuth, 2.16.840.1.113741.1.2.3
subjectAltName = @alt_names

[alt_names]
DNS.1 = test.example.com
DNS.2 = example.com
IP.1 = 192.168.1.1
EOF
    `,
    concept: {
      title: 'Configuration',
      text: 'OpenSSL uses configuration files to control certificate extensions. The OID 2.16.840.1.113741.1.2.3 is specifically required for AMT provisioning.',
      icon: 'ConfigIcon'
    }
  },
  {
    id: 'csr-conf',
    title: '6. Create csr.conf',
    description: `
      Next, we create the Certificate Signing Request (CSR) configuration file.
      This defines the Distinguished Name (DN) fields and other request settings.
    `,
    command: `
# Create csr.conf
cat > csr.conf <<EOF
[ req ]
default_bits = 2048
prompt = no
default_md = sha256
distinguished_name = dn

[ dn ]
C = US
ST = Arizona
L = Chandler
O = Organization
OU = Department
CN = test.example.com
EOF
    `,
    concept: {
      title: 'Distinguished Name',
      text: 'The DN uniquely identifies the entity owning the certificate. It includes fields like Country (C), Organization (O), and Common Name (CN).',
      icon: 'DeclarativeIcon'
    }
  },
  {
    id: 'root-ca',
    title: '7. Generate Root CA',
    description: `
      We need a Certificate Authority (CA) to sign our provisioning certificate.
      We will create a self-signed Root CA certificate and key.
    `,
    command: `
# Create a self-signed CA root certificate
openssl req -x509 -sha256 -days 3560 -nodes -newkey rsa:2048 \\
  -subj "/CN=CA Custom Root Certificate/C=US/ST=Arizona/L=Chandler" \\
  -keyout rootCA.key -out rootCA.crt
    `,
    concept: {
      title: 'Root CA',
      text: 'The Root CA is the trust anchor. In a production environment, this would be a highly secured server. Here, we generate it locally for testing.',
      icon: 'ReliableIcon'
    }
  },
  {
    id: 'server-key',
    title: '8. Generate Server Key',
    description: `
      Now we generate the private key for the provisioning certificate itself.
    `,
    command: `
# Generate RSA private key
openssl genrsa -out server.key 2048
    `,
    concept: {
      title: 'Private Key',
      text: 'This is the private key for the leaf certificate. It will be paired with the signed certificate to prove identity.',
      icon: 'ReliableIcon'
    }
  },
  {
    id: 'server-csr',
    title: '9. Generate Server CSR',
    description: `
      Create a Certificate Signing Request (CSR) using the server private key and the csr.conf configuration.
    `,
    command: `
# Generate CSR
openssl req -new -key server.key -out server.csr -config csr.conf
    `,
    concept: {
      title: 'CSR',
      text: 'The CSR requests a certificate from the CA. It contains the public key and the identity information defined in csr.conf.',
      icon: 'DeclarativeIcon'
    }
  },
  {
    id: 'sign-server',
    title: '10. Sign Server Certificate',
    description: `
      Sign the server CSR using the Root CA we created earlier.
      This creates the final provisioning certificate.
    `,
    command: `
# Sign the CSR with the Root CA
openssl x509 -req -in server.csr -CA rootCA.crt -CAkey rootCA.key \\
  -CAcreateserial -out server.crt -days 3650 -sha256 -extfile cert.conf
    `,
    concept: {
      title: 'Signing',
      text: 'The CA uses its private key to digitally sign the new certificate, vouching for its authenticity and binding it to the requested identity.',
      icon: 'ReliableIcon'
    }
  },
  {
    id: 'create-pfx',
    title: '11. Create PFX File',
    description: `
      Package the private key, server certificate, and Root CA into a PKCS#12 (.pfx) file.
      You will be prompted to set a password. Remember this password!
    `,
    command: `
# Export to PFX
openssl pkcs12 -export -out vprodemo_custom.pfx \\
  -inkey server.key -in server.crt -certfile rootCA.crt
    `,
    concept: {
      title: 'PKCS#12',
      text: 'A .pfx (or .p12) file is a secure container that holds both the private key and the certificate chain. It is used to import the identity into the AMT device.',
      icon: 'ConfigIcon'
    }
  },
  {
    id: 'root-hash',
    title: '12. Get Root Hash',
    description: `
      To trust this custom certificate, the AMT device needs the SHA1 fingerprint of the Root CA.
    `,
    command: `
# Get SHA1 fingerprint of Root CA
openssl x509 -noout -fingerprint -sha1 -inform pem -in rootCA.crt
    `,
    concept: {
      title: 'Trust Hash',
      text: 'The hash serves as a unique fingerprint. By manually entering this hash into the AMT device (via MEBx or USB), you tell the device to trust certificates signed by this Root CA.',
      icon: 'ReliableIcon'
    }
  },
  {
    id: 'verify-hash',
    title: '13. Verify Hash',
    description: `
      After provisioning, you can verify that the hash was correctly inserted into the AMT device.
    `,
    command: `
# Verify hash (requires rpc tool)
rpc amtinfo -cert
    `,
    concept: {
      title: 'Verification',
      text: 'Always verify that the trust anchor is correctly installed. This ensures that the device will accept provisioning attempts using your custom certificate.',
      icon: 'ReliableIcon'
    }
  }
];

export const tutorialOutro: TutorialStep = {
  id: 'finish',
  title: 'Certificate Generated!',
  description: `
      You have successfully generated a private key and a self-signed X.509 certificate.
      
      Files created:
      - device.key (Private Key - KEEP SECRET)
      - device.csr (Certificate Signing Request)
      - device.crt (Public Certificate)

      You can now configure your web server or application to use these files for TLS/SSL.
    `,
  concept: {
    title: 'Trust Chain',
    text: 'In the real world, your device certificate is signed by an Intermediate CA, which is signed by a Root CA. Browsers trust the Root CA, and thus trust your device.',
    icon: 'ReliableIcon'
  }
};
