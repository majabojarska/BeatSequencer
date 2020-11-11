disp("BEEP BOOP")
function saw = sawtoothwave(freq, samplerate, duration)
  x = 0:samplerate*duration-1;
  wavelength = samplerate/freq;
  saw = 2*mod(x, wavelength)/wavelength-1;
end

function sqwave = squarewave(freq, samplerate, duration)
  x = 0:samplerate*duration-1;
  wavelength = samplerate/freq;
  saw = 2*mod(x, wavelength)/wavelength-1; %start with sawtooth wave
  sawzeros = (saw == zeros(size(saw))); %elminates division by zero in next step
  sqwave = -abs(saw)./(saw+sawzeros); %./ for element-by-element division
end

function tri = trianglewave(freq, samplerate, duration)
  x = 0:samplerate*duration-1;
  wavelength = samplerate/freq;
  saw = 2*mod(x, wavelength)/wavelength-1; %start with sawtooth wave
  tri = 2*abs(saw)-1;
end

function sinwav = mysinewave(freq, samplerate, duration)
  sample_duration = 1/samplerate;
  time_steps = 0:sample_duration:duration-sample_duration;
  sinwav = sin(2*pi*freq*time_steps);
end


note_freq = @(note_num) power(nthroot(2,12), note_num-49) * 440;

samplerate = 44100; # Hz
duration = 1; # Seconds
note_numbers = [1:88];

mkdir("saw");
mkdir("tri");
mkdir("sine");
mkdir("square");

fade_duration = 0.01;
fade_in = 0:1/(samplerate*fade_duration):1.0;
fade_out = flip(fade_in);

volume_envelope = horzcat(fade_in,rot90(ones(samplerate*duration-length(fade_in)-length(fade_out),1)),fade_out);

for note_num = note_numbers
  freq = note_freq(note_num);
  note_num_str = int2str(note_num);
  disp(strcat("Generating samples for note: ", note_num_str))
  
  samples_saw = sawtoothwave(freq,samplerate,duration);
  samples_tri = trianglewave(freq,samplerate,duration);
  samples_sine = mysinewave(freq,samplerate,duration);
  samples_square = squarewave(freq,samplerate,duration);
  
  audiowrite(strcat('saw/',note_num_str,".wav"), samples_saw.*volume_envelope, samplerate);
  audiowrite(strcat('tri/',note_num_str,".wav"), samples_tri.*volume_envelope, samplerate);
  audiowrite(strcat('sine/',note_num_str,".wav"), samples_sine.*volume_envelope, samplerate);
  audiowrite(strcat('square/',note_num_str,".wav"), samples_square.*volume_envelope, samplerate);
endfor
