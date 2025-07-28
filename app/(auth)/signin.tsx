import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import "../globals.css";

const PRIMARY = '#FF9900';
const BG_LIGHT = '#fff';
const BG_GRAY = '#F3F4F6';
const TEXT_DARK = '#222';
const TEXT_GRAY = '#666';

function generateCaptcha() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
  return result;
}

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ email: '', password: '' });
  
  // Captcha popup states
  const [showCaptchaModal, setShowCaptchaModal] = useState(false);
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaError, setCaptchaError] = useState('');

  // Animation 
  const emailShake = useRef(new Animated.Value(0)).current;
  const passwordShake = useRef(new Animated.Value(0)).current;
  const captchaShake = useRef(new Animated.Value(0)).current;

  const shake = (anim: Animated.Value) => {
    Animated.sequence([
      Animated.timing(anim, { toValue: 8, duration: 50, useNativeDriver: true }),
      Animated.timing(anim, { toValue: -8, duration: 50, useNativeDriver: true }),
      Animated.timing(anim, { toValue: 6, duration: 50, useNativeDriver: true }),
      Animated.timing(anim, { toValue: -6, duration: 50, useNativeDriver: true }),
      Animated.timing(anim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  const handleSignIn = () => {
    let hasError = false;
    let newError = { email: '', password: '' };
    
    if (!email || !email.includes('@')) {
      newError.email = 'Please enter a valid email address.';
      shake(emailShake);
      hasError = true;
    }
    if (!password || password.length < 6) {
      newError.password = 'Password must be at least 6 characters.';
      shake(passwordShake);
      hasError = true;
    }
    
    setError(newError);
    if (hasError) return;
    
    // Show captcha popup instead of proceeding directly
    setShowCaptchaModal(true);
    setCaptcha(generateCaptcha());
    setCaptchaInput('');
    setCaptchaVerified(false);
    setCaptchaError('');
  };

  const handleCaptchaVerify = () => {
    if (!captchaInput) {
      setCaptchaError('Please enter the captcha code.');
      shake(captchaShake);
      return;
    }
    if (!captchaVerified) {
      setCaptchaError('Please check "I\'m not a robot".');
      return;
    }
    
    // for simulation only
    setCaptchaError('');
    setShowCaptchaModal(false);
    
    // sign in
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to home or dashboard (not implemented here)
    }, 1200);
  };

  const closeCaptchaModal = () => {
    setShowCaptchaModal(false);
    setCaptchaInput('');
    setCaptchaVerified(false);
    setCaptchaError('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flex1}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          
          {/* Header with Logo */}
          <View style={styles.headerContainer}>
            <View style={styles.logoContainer}>
              <Image source={require('../../assets/images/logo.png')} style={styles.logoCircle} resizeMode="contain" />
            </View>
            
            <Text style={styles.title}>Sign In</Text>
          </View>

          {/* Form Container */}
          <View style={styles.formContainer}>
            
            {/* Email Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <Animated.View style={{ transform: [{ translateX: emailShake }] }}>
                <View style={[styles.inputContainer, error.email && styles.inputError]}>
                  <Ionicons name="mail-outline" size={20} color="#999" style={styles.inputIcon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter your email..."
                    placeholderTextColor="#999"
                    value={email}
                    onChangeText={t => { setEmail(t); setError(e => ({ ...e, email: '' })); }}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <View style={styles.cursorIcon}>
                    <Ionicons name="hand-left" size={16} color={PRIMARY} />
                  </View>
                </View>
                {!!error.email && (
                  <Text style={styles.errorText}>{error.email}</Text>
                )}
              </Animated.View>
            </View>

            {/* Password Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Password</Text>
              <Animated.View style={{ transform: [{ translateX: passwordShake }] }}>
                <View style={[styles.inputContainer, error.password && styles.inputError]}>
                  <Ionicons name="lock-closed-outline" size={20} color="#999" style={styles.inputIcon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter your password..."
                    placeholderTextColor="#999"
                    value={password}
                    onChangeText={t => { setPassword(t); setError(e => ({ ...e, password: '' })); }}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(s => !s)} style={styles.eyeButton}>
                    <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={20} color="#999" />
                  </TouchableOpacity>
                </View>
                {!!error.password && (
                  <Text style={styles.errorText}>{error.password}</Text>
                )}
              </Animated.View>
            </View>
            
            {/* Sign In Button */}
            <TouchableOpacity 
              style={[styles.signInBtn, isLoading && styles.signInBtnLoading]} 
              onPress={handleSignIn} 
              disabled={isLoading}
              activeOpacity={0.8}
            >
              <Text style={styles.signInBtnText}>
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Text>
              {!isLoading && <Ionicons name="arrow-forward" size={20} color="#fff" style={styles.arrowIcon} />}
            </TouchableOpacity>

            {/* Footer Links */}
            <View style={styles.footerContainer}>
              <View style={styles.footerRow}>
                <Text style={styles.footerText}>Don't have an account? </Text>
                <TouchableOpacity>
                  <Text style={styles.linkText}>Sign Up</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.forgotPasswordContainer}>
                <Text style={styles.linkText}>Forgot your password?</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Captcha Modal */}
      <Modal
        visible={showCaptchaModal}
        animationType="fade"
        transparent={true}
        onRequestClose={closeCaptchaModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Security Verification</Text>
              <TouchableOpacity onPress={closeCaptchaModal} style={styles.closeButton}>
                <Ionicons name="close" size={24} color={TEXT_GRAY} />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalSubtitle}>Please complete the captcha to continue</Text>

            {/* Captcha Code Display */}
            <View style={styles.captchaCodeRowModern}>
              <View style={styles.captchaPill}>
                <Text style={styles.captchaCodeModern}>{captcha.split('').join(' ')}</Text>
              </View>
              <TouchableOpacity 
                style={styles.captchaRefreshCircle} 
                onPress={() => {
                  setCaptcha(generateCaptcha());
                  setCaptchaInput('');
                  setCaptchaVerified(false);
                  setCaptchaError('');
                }} 
                accessibilityLabel="Refresh captcha" 
                activeOpacity={0.7}
              >
                <Ionicons name="refresh-outline" size={22} color={PRIMARY} />
              </TouchableOpacity>
            </View>

            {/* Captcha Input */}
            <Animated.View style={{ transform: [{ translateX: captchaShake }] }}>
              <View style={[styles.inputContainer, captchaError && styles.inputError]}>
                <Ionicons name="shield-checkmark-outline" size={20} color={captchaError ? '#FF3333' : '#999'} style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter captcha code"
                  placeholderTextColor="#999"
                  autoCapitalize="characters"
                  autoCorrect={false}
                  value={captchaInput}
                  onChangeText={t => { setCaptchaInput(t); setCaptchaError(''); }}
                />
              </View>
            </Animated.View>

            {/* I'm not a robot checkbox */}
            <View style={styles.robotCheckContainer}>
              <TouchableOpacity
                onPress={() => setCaptchaVerified(v => !v)}
                style={[styles.captchaCheckboxModern, captchaVerified ? styles.captchaCheckboxCheckedModern : styles.captchaCheckboxUncheckedModern]}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: captchaVerified }}
                accessibilityLabel="I'm not a robot"
                activeOpacity={0.7}
              >
                {captchaVerified && <Ionicons name="checkmark" size={16} color="#fff" />}
              </TouchableOpacity>
              <Text style={styles.captchaLabelModern}>I'm not a robot</Text>
            </View>

            {/* Error Message */}
            {!!captchaError && (
              <View style={styles.errorRow}>
                <Ionicons name="alert-circle" size={16} color="#FF3333" style={{ marginRight: 4 }} />
                <Text style={styles.errorText}>{captchaError}</Text>
              </View>
            )}

            {/* Modal Buttons */}
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={closeCaptchaModal}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.verifyButton} onPress={handleCaptchaVerify}>
                <Text style={styles.verifyButtonText}>Verify</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: BG_LIGHT 
  },
  flex1: { 
    flex: 1 
  },
  scrollContent: { 
    flexGrow: 1, 
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 20
  },
  
  // Header Styles
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    marginBottom: 32,
  },
  logoCircle: {
   height: 60,
    width:200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: TEXT_DARK,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: TEXT_GRAY,
    textAlign: 'center',
    lineHeight: 22,
  },

  // Form Styles
  formContainer: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: TEXT_DARK,
    marginBottom: 8,
  },
  inputContainer: {
    backgroundColor: BG_GRAY,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 56,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  inputError: {
    borderColor: '#FF3333',
    backgroundColor: '#FFF6F6',
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: TEXT_DARK,
    fontWeight: '400',
  },
  cursorIcon: {
    marginLeft: 8,
  },
  eyeButton: {
    padding: 4,
    marginLeft: 8,
  },
  errorText: {
    color: '#FF3333',
    fontSize: 14,
    marginTop: 6,
    marginLeft: 4,
  },

  // Button Styles
  signInBtn: {
    backgroundColor: PRIMARY,
    borderRadius: 16,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 32,
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  signInBtnLoading: {
    opacity: 0.8,
  },
  signInBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginRight: 8,
  },
  arrowIcon: {
    marginLeft: 4,
  },

  // Footer Styles
  footerContainer: {
    alignItems: 'center',
    gap: 16,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: TEXT_GRAY,
  },
  linkText: {
    fontSize: 16,
    color: PRIMARY,
    fontWeight: '600',
  },
  forgotPasswordContainer: {
    marginTop: 8,
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    width: '90%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: TEXT_DARK,
  },
  closeButton: {
    padding: 4,
  },
  modalSubtitle: {
    fontSize: 14,
    color: TEXT_GRAY,
    marginBottom: 24,
    textAlign: 'center',
  },

  // Captcha Styles (for modal)
  captchaCodeRowModern: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
    marginBottom: 20 
  },
  captchaPill: {
    backgroundColor: '#F6F6F6', 
    borderRadius: 24, 
    paddingHorizontal: 24, 
    paddingVertical: 12, 
    marginRight: 12, 
    minWidth: 140,
    alignItems: 'center', 
    justifyContent: 'center', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 1 }, 
    shadowOpacity: 0.04, 
    shadowRadius: 2, 
    elevation: 1,
  },
  captchaCodeModern: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: PRIMARY, 
    letterSpacing: 6, 
    textAlign: 'center' 
  },
  captchaRefreshCircle: {
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    backgroundColor: '#fff', 
    alignItems: 'center', 
    justifyContent: 'center',
    shadowColor: PRIMARY, 
    shadowOffset: { width: 0, height: 1 }, 
    shadowOpacity: 0.08, 
    shadowRadius: 2, 
    elevation: 2,
  },
  robotCheckContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  captchaCheckboxModern: {
    width: 24, 
    height: 24, 
    borderRadius: 12, 
    borderWidth: 2, 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginRight: 8,
  },
  captchaCheckboxCheckedModern: { 
    backgroundColor: PRIMARY, 
    borderColor: PRIMARY 
  },
  captchaCheckboxUncheckedModern: { 
    backgroundColor: '#F6F6F6', 
    borderColor: '#888' 
  },
  captchaLabelModern: { 
    fontSize: 14, 
    color: TEXT_DARK, 
    fontWeight: '500',
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },

  // Modal Button Styles
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: TEXT_GRAY,
  },
  verifyButton: {
    flex: 1,
    backgroundColor: PRIMARY,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  verifyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});