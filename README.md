# Wehabu

Wehabu is a comprehensive time management solution built with Next.js. It empowers individuals and teams to stay organized and productive through its integrated features. Wehabu offers a user-friendly interface for creating, managing, and sharing schedules, along with a robust clock in/out system for accurate time tracking. This combined functionality helps users streamline their workflow, improve collaboration, and gain valuable insights into work patterns.

## 1 Technologies

- Next.js (14.1.0)
- Prisma ORM
- Sass

## 2.Installation

### 1.1 Environment Variables

#### 1.1.1 Create .env file in the root directory

- DATABASE_URL: CockroachDB database url
- JWT_SECRET: Secret key to encrypt user session
- URL: Domain url
- AWS_LAMBDA_URL: AWS Lambda function url

#### 1.1.2 Configure environment variables in the aws lambda function that the system uses

- EMAIL: Gmail address that sends emails from the system
- PASSWORD: Gmail App Password(https://support.google.com/accounts/answer/185833?hl=en)

### 1.2 Install Commands

Make sure environment variables are properly set and the code in AWS directory is uploaded to your AWS Lambda

#### 1.2.1 Wehabu platform

```sh
# Clone repository
git clone https://github.com/csis4950-project/csis4950-project.git

cd csis4950-project

# Install dependencies
npm i

# Load database models
npx prisma generate

# Run application
npm run dev
```
