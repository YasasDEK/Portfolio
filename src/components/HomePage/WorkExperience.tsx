import {
  Box,
  Stack,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";

const steps = [
  {
    label: "Calcey Technologies - Singapore (Remote)",
    description: `Working on a customer project (AiScout - UK based sports company) with Fullstack development.`,
  },
  {
    label: "Newnop - Korea (Remote)",
    description: `Working on a customer project (Tickle - Korea based cleaning company) with Frontend development.`,
  },
  {
    label: "Enactor Limited - Sri Lanka",
    description: `Worked on a customer porject (CentralGroup -Retail Company) by developing a POS-Based system`,
  },
  {
    label: "hSenid Mobile Solutions - Sri Lanka",
    description: `Worked on severalprojects with software development and research & development`,
  },
];

const WorkExperience = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
      <Stack
        sx={{
          display: "flex",
          alignItems: "flex-start",
          width: "75vw",
        }}
      >
        <Typography sx={{ fontSize: 25, fontWeight: "bold" }}>
          Work Experience
        </Typography>

        <Stepper orientation="vertical">
          {steps.map((step, index) => (
            <Step key={index} expanded>
              <StepLabel>
                <Typography sx={{ color: "#fe6c0a", fontWeight: "bold" }}>
                  {step.label}
                </Typography>
              </StepLabel>
              <StepContent>
                <Typography>{step.description}</Typography>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Stack>
    </Box>
  );
};

export default WorkExperience;
