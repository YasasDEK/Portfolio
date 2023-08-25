import {
  Box,
  Stack,
  Typography,
  Divider,
  IconButton,
  Tooltip,
  TextField,
  FormLabel,
  Button,
  Alert,
} from "@mui/material";
import { getDoc, doc } from "firebase/firestore";
import { RefObject, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { database } from "../../config/firebase";
import SingleBlogPageSkeleton from "./SingleBlogPageSkeleton";
import MessageIcon from "@mui/icons-material/Message";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface Blog {
  blog: {
    paragraph: string;
    subHeading: string;
  }[];
  blogDate: string;
  description: string;
  heading: string;
  readTime: string;
  shortDescription: string;
  tags: string[];
  coverImage: string;
}

const SingleBlog = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const blogId = queryParams.get("blogId");
  const [loading, setLoading] = useState(true);
  const [blogDetails, setBlogDetails] = useState<Blog | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const formSchema = z.object({
    name: z
      .string()
      .min(1, { message: "required" })
      .max(50, { message: "large" }),
    email: z
      .string()
      .min(1, { message: "required" })
      .max(260, { message: "large" })
      .email({ message: "invalid" }),
    comment: z
      .string()
      .min(1, { message: "required" })
      .max(500, { message: "large" }),
  });

  type FormSchema = z.infer<typeof formSchema>;

  const formDefaultValue = {
    name: "",
    email: "",
    comment: "",
  };

  const { handleSubmit, control, reset, formState } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: formDefaultValue,
  });

  const textFieldStyles = {
    mt: 0.5,
    background: "white",
    borderRadius: 2,
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "#fe6c0a",
        opacity: 0.75,
        borderRadius: 2,
      },
      "&.Mui-focused fieldset": {
        borderColor: "#fe6c0a",
        borderRadius: 2,
        opacity: 0.75,
      },
    },
  };

  const onSubmit = () => {
    console.log("submitted");

    reset();
  };

  const getError = () => {
    if (
      formState.errors.name?.message === "required" ||
      formState.errors.email?.message === "required" ||
      formState.errors.comment?.message === "required"
    ) {
      return (
        <Alert severity="error">
          Please fill all the fileds to add a comment
        </Alert>
      );
    }

    if (
      formState.errors.email?.message === "invalid" ||
      formState.errors.email?.message === "large"
    ) {
      return <Alert severity="error">Invalid Email</Alert>;
    }

    if (formState.errors.name?.message === "large") {
      return (
        <Alert severity="error">
          Name should contain less than 30 characters
        </Alert>
      );
    } else if (formState.errors.comment?.message === "large") {
      return (
        <Alert severity="error">
          comment should contain less than 500 characters
        </Alert>
      );
    }

    return "";
  };

  const scrollBottom = (event: RefObject<HTMLDivElement>) => {
    event?.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const headingSection = (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mt: 2 }}
    >
      <Typography
        sx={{
          color: "white",
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 40,
        }}
      >
        {blogDetails?.heading}
      </Typography>

      <Stack sx={{ p: 0, m: 0 }}>
        <Typography sx={{ color: "white", fontSize: 14, justifyItem: "end" }}>
          📆 {blogDetails?.blogDate}
        </Typography>

        <Typography
          sx={{
            color: "white",
            fontSize: 14,
            display: "flex",
            justifyContent: "end",
          }}
        >
          ⏳ {blogDetails?.readTime}
        </Typography>
      </Stack>
    </Stack>
  );

  const shortDescriptionSection = (
    <Box
      sx={{
        py: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography sx={{ color: "white", fontSize: 18 }}>
        {blogDetails?.shortDescription}
      </Typography>

      <Tooltip title="Add a comment" placement="left" sx={{ p: 0 }}>
        <IconButton onClick={() => scrollBottom(scrollRef)}>
          <MessageIcon
            sx={{
              color: "white",
              "&:hover": {
                color: "#fe6c0a",
              },
            }}
          />
        </IconButton>
      </Tooltip>
    </Box>
  );

  const commentFormSection = (
    <Box ref={scrollRef}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography
          sx={{
            color: "rgba(0, 0, 0, 0.6)",
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 18,
          }}
        >
          Name
        </Typography>

        <Controller
          name="name"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              fullWidth
              size="small"
              sx={textFieldStyles}
              value={value}
              onChange={onChange}
            />
          )}
        />

        <Typography
          sx={{
            mt: 2,
            color: "rgba(0, 0, 0, 0.6)",
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 18,
          }}
        >
          Email
        </Typography>

        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              fullWidth
              size="small"
              sx={textFieldStyles}
              value={value}
              onChange={onChange}
            />
          )}
        />

        <Typography
          sx={{
            mt: 2,
            color: "rgba(0, 0, 0, 0.6)",
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 18,
          }}
        >
          Comment
        </Typography>

        <Controller
          name="comment"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              multiline
              rows={4}
              type="email"
              fullWidth
              size="small"
              sx={textFieldStyles}
              onChange={onChange}
              value={value}
            />
          )}
        />

        <Box
          sx={{
            gap: 2,
            flexDirection: { xs: "column", lg: "row" },
            display: "flex",
            justifyContent: "end",
            mt: 2,
          }}
        >
          <Box>{getError()}</Box>

          <Box>
            <Button
              variant="contained"
              type="submit"
              sx={{
                width: { xs: "100%", lg: 180 },
                backgroundColor: "#fe6c0a",
                "&:hover": { background: "#fe6c0a", opacity: 0.8 },
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 20,
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );

  const singlePageContent = (
    <Box sx={{ width: "75vw", flexWrap: "wrap" }}>
      <Box
        sx={{
          width: "100%",
          height: 350,
          backgroundImage: `url(${blogDetails?.coverImage})`,
          backgroundColor: "white",
          backgroundPosition: "center",
          display: "flex",
          borderRadius: 2,
          justifyContent: "center",
          alignItems: "end",
        }}
      />
      <Box sx={{ px: 20 }}>
        {headingSection}

        <Divider sx={{ backgroundColor: "#33393f" }} />

        {shortDescriptionSection}

        <Divider sx={{ backgroundColor: "#33393f" }} />

        <Typography sx={{ mt: 4, color: "white", fontSize: 16 }}>
          {blogDetails?.description}
        </Typography>

        <Box sx={{ py: 4, px: { sm: 0, lg: 8 } }}>
          <Stack
            sx={{
              p: 4,
              backgroundColor: "#80868c",
              borderRadius: 2,
            }}
          >
            <FormLabel
              sx={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 25,
              }}
            >
              💭💡What are your thoughts?
            </FormLabel>

            {commentFormSection}
          </Stack>
        </Box>
      </Box>
    </Box>
  );

  useEffect(() => {
    setLoading(true);

    reset();

    const getBlogsPosts = async () => {
      if (blogId) {
        try {
          const documentRef = doc(database, "blogPosts", blogId);

          const documentSnapshot = await getDoc(documentRef);

          setBlogDetails({
            blog: documentSnapshot.data()?.blog,
            blogDate: documentSnapshot.data()?.blogDate,
            description: documentSnapshot.data()?.description,
            heading: documentSnapshot.data()?.heading,
            readTime: documentSnapshot.data()?.readTime,
            shortDescription: documentSnapshot.data()?.shortDescription,
            tags: documentSnapshot.data()?.tags,
            coverImage: documentSnapshot.data()?.coverImage,
          });

          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      }
    };

    getBlogsPosts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ pb: 8, pt: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {loading ? <SingleBlogPageSkeleton /> : singlePageContent}
      </Box>
    </Box>
  );
};

export default SingleBlog;
