import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import IconButton from '@material-ui/core/IconButton';

import { Button } from 'Components';
import styles from './Signup.module.scss';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    margin: 0,
    width: '250px',
    fontSize: '14',
  },
  labelRoot: {
    fontSize: '14px',
  },
  labelFocused: {
    fontSize: '17px',
  },
  select: {
    fontSize: '14px',
  },
}));

const Signup = memo(({
  handleClickShowPassword,
  handleMouseDownPassword,
  showPassword,
  handleSubmit,
  imageOnChange,
  fields,
  onChange,
}) => {
  const classes = useStyles();
  return (
    <div className={styles.grid}>
      <div className={styles.formContainer}>
        <div>
          <form onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <div className={styles.profileImageWrapper}>
              <div className={styles.fileWrapper}>
                <label htmlFor={styles.image}>
                  <input
                    type="file"
                    id={styles.image}
                    onChange={imageOnChange}
                    accept="image/*"
                  />
                  <img
                    src={fields.imgUrl ? fields.imgUrl : '/defaultProfile.png'}
                    alt="File"
                  />
                </label>
              </div>
            </div>
            <div>
              <TextField
                name="name"
                label="Name"
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.labelRoot,
                    focused: classes.labelFocused,
                  },
                }}
                onChange={onChange}
                required
              />
            </div>
            <div>
              <TextField
                name="email"
                label="Email"
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.labelRoot,
                    focused: classes.labelFocused,
                  },
                }}
                type="email"
                onChange={onChange}
                autoComplete="username"
                required
              />
            </div>
            <div>
              <TextField
                name="bio"
                label="Bio"
                multiline
                rows={4}
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.labelRoot,
                    focused: classes.labelFocused,
                  },
                }}
                onChange={onChange}
                required
              />
            </div>
            <FormControl required>
              <InputLabel
                htmlFor="outlined-adornment-password"
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.labelRoot,
                    focused: classes.labelFocused,
                  },
                }}
                classes={{
                  root: classes.labelRoot,
                  focused: classes.labelFocused,
                }}
              >
                Password
              </InputLabel>
              <Input
                type={showPassword ? 'text' : 'password'}
                value={fields.password}
                name="password"
                label="Password"
                className={classes.textField}
                onChange={onChange}
                autoComplete="new-password"
                endAdornment={(
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )}
                labelWidth={70}
                required
              />
            </FormControl>
            <div className={styles.buttonWrapper}>
              <Button variant="filled" type="submit">
                Sign Up
              </Button>
            </div>
            <p className={styles.linkText}>
              Have got an account already?
              {' '}
              <u>
                <Link to="/" className={styles.link}>
                  Sign in
                </Link>
              </u>
            </p>
          </form>
        </div>
      </div>
      <div className={styles.formImage} />
    </div>
  );
});

export default Signup;
