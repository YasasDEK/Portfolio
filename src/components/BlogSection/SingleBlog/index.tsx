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
import { getDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { RefObject, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { database } from "../../../config/firebase";
import MessageIcon from "@mui/icons-material/Message";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CircularProgress from "@mui/material/CircularProgress";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import CommentsDrawer from "../CommentsDrawer";
import { colorPalette } from "../../Shared/pageHelpers";
import { customStyles } from "./index.styles";
import SingleBlogPageSkeleton from "../SingleBlogPageSkeleton/index.styles";

interface Blog {
  blog: {
    subHeading: string;
    paragraph: string[];
  }[];
  blogDate: string;
  description: string;
  heading: string;
  readTime: string;
  shortDescription: string;
  tags: string[];
  coverImage: string;
}

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

const SingleBlog = () => {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const isDataFetched = useRef(false);

  const blogId = queryParams.get("blogId");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccessful, setSubmitSuccessful] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [blogDetails, setBlogDetails] = useState<Blog | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { handleSubmit, control, reset, formState, getValues } =
    useForm<FormSchema>({
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
        borderColor: colorPalette.orangeColor,
        opacity: 0.75,
        borderRadius: 2,
      },
      "&.Mui-focused fieldset": {
        borderColor: colorPalette.orangeColor,
        borderRadius: 2,
        opacity: 0.75,
      },
    },
  };

  const resetAlerts = () => {
    setSubmitSuccessful(false);
    setErrorSubmit(false);
  };

  const onSubmit = async () => {
    resetAlerts();

    if (blogId) {
      setSubmitting(true);
      try {
        const documentRef = doc(database, "blogPosts", blogId);

        await updateDoc(documentRef, {
          comments: arrayUnion(getValues()),
        });

        setSubmitSuccessful(true);

        reset();

        setTimeout(resetAlerts, 3000);
      } catch (error) {
        setErrorSubmit(true);
      }
    }

    setSubmitting(false);
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

  const handleDrawerClose = () => {
    setCommentsOpen(false);
  };

  const getText = (para: string) => {
    if (para.includes("<code>")) {
      const sandBoxUrl = para.replace(/<\/?code>/g, "");

      return (
        <iframe
          src={sandBoxUrl}
          style={{
            width: "100%",
            height: "500px",
            border: 0,
            borderRadius: 4,
            overflow: "hidden",
            marginTop: 16,
          }}
          title={blogDetails?.heading}
          allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        />
      );
    }

    if (para.includes("<bold>")) {
      const boldText = para.replace(/<\/?bold>/g, "");

      return <Typography fontWeight="bold">{boldText}</Typography>;
    }

    if (para.includes("<list>")) {
      const listText = para.replace(/<\/?list>/g, "");

      return <Typography sx={customStyles.list}>🚀 {listText}</Typography>;
    }

    return <Typography>{para}</Typography>;
  };

  const headingSection = (
    <Box sx={customStyles.headingSection}>
      <Typography sx={customStyles.headingTypography}>
        {blogDetails?.heading}
      </Typography>

      <Box sx={customStyles.metaBox}>
        <Typography sx={customStyles.dateTypography}>
          📆{blogDetails?.blogDate}
        </Typography>

        <Typography sx={customStyles.readTimeTypography}>
          ⏳{blogDetails?.readTime} read
        </Typography>
      </Box>
    </Box>
  );

  const iconButtonSection = (
    <Stack
      direction="row"
      alignItems="top"
      spacing={1}
      sx={customStyles.iconButtonSection}
    >
      <Tooltip
        title="Add a comment"
        placement="top"
        sx={customStyles.iconButtonTooltip}
      >
        <IconButton onClick={() => scrollBottom(scrollRef)}>
          <MessageIcon sx={customStyles.iconButton} />
        </IconButton>
      </Tooltip>

      <Tooltip
        title="Read previous comments"
        placement="top"
        sx={customStyles.iconButtonTooltip}
      >
        <IconButton onClick={() => setCommentsOpen(true)}>
          <MarkEmailReadIcon sx={{ ...customStyles.iconButton, pb: 0.5 }} />
        </IconButton>
      </Tooltip>
    </Stack>
  );

  const shortDescriptionSection = (
    <Box sx={customStyles.shortDescriptionSection}>
      <Box>
        <Typography sx={customStyles.descriptionTypography}>
          {blogDetails?.shortDescription}
        </Typography>

        <Box sx={customStyles.tagsBox}>
          {blogDetails?.tags.map((tag, index) => (
            <Typography key={index} sx={customStyles.tagTypography}>
              #{tag}
            </Typography>
          ))}
        </Box>
      </Box>
      {iconButtonSection}
    </Box>
  );

  const commentFormSection = (
    <Box ref={scrollRef}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography sx={customStyles.typography}>Name</Typography>

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

        <Typography sx={customStyles.typography}>Email</Typography>

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

        <Typography sx={customStyles.typography}>Comment</Typography>

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

        <Box sx={customStyles.box}>
          <Box>{getError()}</Box>

          {!getError() && submitSuccessful && (
            <Alert severity="success">Thank you for your comments!</Alert>
          )}

          {errorSubmit && (
            <Alert severity="success">
              An unexpected error occurred! Please try again!
            </Alert>
          )}
          <Box>
            <Button
              variant="contained"
              type="submit"
              disabled={submitting}
              sx={customStyles.textField}
            >
              Submit
              {submitting && (
                <CircularProgress sx={customStyles.progressIcon} size={20} />
              )}
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );

  const commentsHeaderSection = (
    <FormLabel sx={customStyles.formLabel}>
      💭💡What are your thoughts?
    </FormLabel>
  );

  const subsectionArea = (
    <Stack spacing={4} sx={customStyles.stack}>
      {blogDetails?.blog.map((data, index) => (
        <Box key={index}>
          <Typography sx={customStyles.subHeadingTypography}>
            {data.subHeading}
          </Typography>

          {data.paragraph.map((para, subIndex) => (
            <Box key={subIndex} sx={customStyles.paragraphBox}>
              {getText(para)}
            </Box>
          ))}
        </Box>
      ))}
    </Stack>
  );

  const singlePageContent = (
    <Box sx={customStyles.singlePageBox}>
      <Box
        sx={{
          ...customStyles.coverImageBox,
          backgroundImage: `url(${blogDetails?.coverImage})`,
        }}
      />

      <Box sx={customStyles.headingBox}>
        {headingSection}

        <Divider sx={customStyles.divider} />

        {shortDescriptionSection}

        <Divider sx={customStyles.divider} />

        <Typography sx={customStyles.singlePageTypography}>
          {blogDetails?.description}
        </Typography>

        {subsectionArea}

        <Box sx={customStyles.commentBox}>
          <Stack sx={customStyles.singlePageStack}>
            {commentsHeaderSection}

            {commentFormSection}
          </Stack>
        </Box>
      </Box>

      <CommentsDrawer
        open={commentsOpen}
        handleClose={handleDrawerClose}
        blogId={blogId!}
      />
    </Box>
  );

  useEffect(() => {
    if (isDataFetched.current) return;

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
        } catch (_error) {
          setLoading(false);
        }
      }
    };

    getBlogsPosts();

    isDataFetched.current = true;
  }, [blogId, reset]);

  return (
    <Box pt={2}>
      <Box sx={customStyles.mainBox}>
        {loading ? <SingleBlogPageSkeleton /> : singlePageContent}
      </Box>
    </Box>
  );
};

export default SingleBlog;
