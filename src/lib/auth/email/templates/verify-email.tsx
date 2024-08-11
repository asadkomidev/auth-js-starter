import {
  Body,
  Button,
  Container,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

type Props = {
  link: string;
  name: string;
};

const logoUrl = process.env.LOGO_URL || "";

export function VerifyEmail({ link, name }: Props) {
  return (
    <Html lang="en">
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Section className="my-[12px] text-center">
              <Link
                href="https://www.asadkomi.com/"
                className="flex text-center text-2xl font-bold text-black"
              >
                <Img src={logoUrl} width="140" height="33" alt="acme" />
              </Link>
            </Section>
            <Hr className="mx-0 mb-[26px] w-full" />
            <Heading className="mx-0 my-[30px] p-0 text-[16px] font-normal text-black">
              <strong>Verify your email address</strong>
            </Heading>
            <Text className="text-[14px] leading-[24px] text-[#666666]">
              Hello {name},
            </Text>
            <Text className="text-[14px] leading-[24px] text-[#666666]">
              You’re almost ready to start enjoying acme. Simply click the
              Verify button below to verify your email address.
            </Text>
            <Section className="mb-[32px] mt-[32px] text-center">
              <Button
                className="rounded bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={link}
              >
                Verify
              </Button>
            </Section>

            <Text className="text-[14px] leading-[24px] text-[#666666]">
              Thanks,
              <br /> The acme team
            </Text>
            <Hr className="mx-0 my-[18px] w-full" />
            <Text className="text-center text-[12px] leading-[24px] text-[#666666]">
              You received this email because you signed up on acme.com
            </Text>
            <Text className="text-center text-[10px] leading-[24px] text-[#666666]">
              acme. <br />
              123 Main St, Chandler, AZ 12345
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export default VerifyEmail;
