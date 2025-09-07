import React, { useState } from 'react';
import { useForm } from "react-hook-form"
import { motion } from "framer-motion";
import registerBg from '../components/Image/LoginImg/registerBg.jpg'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, Upload } from "lucide-react";
import { Button } from '@/components/nurui/button';
import UseAuth from '@/Hooks/UseAuth';
import { imageUpload } from '@/Api/utils';
import UseAxiosPublic from '@/Hooks/UseAxiosPublic';
import { CgSpinnerTwo } from "react-icons/cg";
import { useNavigate } from 'react-router';


const Register = () => {
    const { CreateUser, UpdateUser, setUser } = UseAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [preview, setPreview] = useState(null);
    const [imgSize, setImgSize] = useState(null);
    const [loading, setLoading] = useState(false);
    const axiosPublic = UseAxiosPublic();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();



    const onSubmit = async (data) => {
        try {
            setLoading(true);
            // create image link
            let imgUrl = '';
            if (data.image && data.image[0]) {
                imgUrl = await imageUpload(data.image[0])
            }

            // create user
            const result = await CreateUser(data.email, data.password);

            // Update user
            await UpdateUser({
                displayName: data.name,
                photoURL: imgUrl
            })

            // save user in mongodb
            const userInfo = {
                name: data.name,
                email: data.email,
                institution: data.institution || 'N/A',
                photo: imgUrl
            }

            await axiosPublic.post('/users', userInfo)
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
            navigate('/home')
        }

    }
    return (
        <div
            className='h-screen w-screen flex items-center justify-center bg-cover bg-center'
            style={{
                backgroundImage: `url(${registerBg})`
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className='w-full max-w-md'
            >
                <Card className='relative backdrop-blur-md bg-white/10 dark:bg-black/20 border border-[#E38B8B]/50 shadow-xl rounded-2xl'>
                    <CardHeader>
                        <CardTitle className='text-center text-2xl font-bold text-gray-900 dark:text-white'>
                            REGISTER NOW!!
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form
                            className="space-y-4"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            {/* User name */}
                            <div className="space-y-2">
                                <Label className="text-gray-900 dark:text-gray-200">
                                    Username
                                </Label>
                                <Input
                                    name='name'
                                    type='text'
                                    placeholder="Enter your Username"
                                    {...register("name", { required: true })}
                                    className="rounded-full border border-purple-300/50 bg-white/50 dark:bg-white/10 text-gray-900 dark:text-white"
                                />
                            </div>
                            {/* Email */}
                            <div className="space-y-2">
                                <Label className="text-gray-900 dark:text-gray-200">
                                    Email
                                </Label>
                                <Input
                                    name="email"
                                    type="email"
                                    placeholder="Enter your Email"
                                    {...register("email", { required: true })}
                                    className="rounded-full border border-purple-300/50 bg-white/50 dark:bg-white/10 text-gray-900 dark:text-white"
                                />
                            </div>

                            {/* Password */}

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-gray-900 dark:text-gray-200">
                                    Password
                                </Label>
                                <div className="relative">
                                    <Input
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your Password"
                                        {...register("password", { required: true })}
                                        className="rounded-full border border-purple-300/50 bg-white/50 dark:bg-white/10 text-gray-900 dark:text-white pr-10"
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-3 flex items-center text-gray-600 dark:text-gray-300"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                                    </button>
                                </div>
                            </div>

                            {/* Institution */}

                            <div className="space-y-2">
                                <Label className="text-gray-900 dark:text-gray-200">
                                    Institution
                                </Label>
                                <Input
                                    name='institution'
                                    placeholder="Enter your Institution"
                                    {...register("institution")}
                                    className="rounded-full border border-[#E38B8B]/50 bg-white/50 dark:bg-white/10 text-gray-900 dark:text-white"
                                />
                            </div>
                            {/* Image upload */}

                            <div className="space-y-2">
                                <Label className="text-gray-900 dark:text-gray-200">
                                    Upload Profile Image
                                </Label>
                                <div className="flex items-center gap-3">
                                    <label
                                        htmlFor="image"
                                        className="cursor-pointer flex items-center gap-2 rounded-full border border-[#E38B8B]/50 bg-white/50 dark:bg-white/10 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-[#B54C4E]/20 transition"
                                    >
                                        <Upload size={18} /> Choose File
                                    </label>
                                    <Input
                                        id="image"
                                        name="image"
                                        type="file"
                                        accept="image/*"
                                        {...register("image", {
                                            onChange: (e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    setPreview(URL.createObjectURL(file));
                                                    setImgSize(file.size);
                                                }
                                            },
                                        })}
                                        className="hidden"
                                    />
                                </div>
                                {preview && (
                                    <div className="mt-3 flex justify-center items-center gap-2">
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            className="h-24 w-24 rounded-full object-cover border-2 border-[#B54C4E] shadow-md"
                                        />
                                        <p>Image Size: {Math.round(imgSize / 1024)} kb</p>
                                    </div>
                                )}
                            </div>
                            {/* Submit button */}
                            <Button
                                type="submit"
                                className="w-full rounded-full bg-gradient-to-r from-[#B54C4E] to-[#F2C94C] hover:from-[#A63D3F] hover:to-[#E6B800] text-white font-semibold shadow-lg"
                            >
                                {loading ? (<CgSpinnerTwo className='animate-spin text-xl'></CgSpinnerTwo>) : "Register"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>

        </div>
    );
};

export default Register;